import axios from 'axios';
import React from 'react'

const SlideshowEdit = () => {
  const {
    baseUrl,
    baseUrlImage,
    isSlideshowEdit,
    setIsSlideshowEdit,
    slideshowEditing,
    setSlideshowEditing,
    setAllSlideshows
  } = useGlobalContext();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('level', slideshowNew.level);
    formData.append('name', slideshowNew.name);
    formData.append('place', slideshowNew.place);
    formData.append('slideImage', slideshowNew.slideImage);

    try {
      const response = await axios.put(`${baseUrl}/Slides/${slideshowEditing.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsSlideshowEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDrop = (file) => {
    setAvatarEditing({ ...slideshowEditing, slideImage: file });
  };


  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setIsSlideshowEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini" style={{ padding: '.5rem' }}>Edit Slideshow</h3>
      <div>
        <label className='fieldLabel'>Upload Gif:</label>
        <div>
          <label className='fieldLabel'>Name:</label>
          <input
            className='inputField'
            type="text"
            value={slideshowEditing.name}
            placeholder='Name'
            onChange={(e) => setSlideshowEditing({ ...slideshowEditing, name: e.target.value })}
          />
        </div>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzoneAuthor">
              <input {...getInputProps()} />
              {avatarEditing ? (
                <img src={typeof slideshowEditing.filePath === 'string' ? `${baseUrlImage}/${slideshowEditing.filePath}` : URL.createObjectURL(slideshowEditing.slideImage)} alt="Author Image" className="uploaded-Slideshow-image" />
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      <div>
        <label className='fieldLabel'>level:</label>
        <input
          className='inputField'
          type="text"
          value={slideshowEditing.level}
          placeholder='Level'
          onChange={(e) => setAvatarEditing({ ...slideshowEditing, level: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Place:</label>
        <input
          className='inputField'
          type="text"
          value={slideshowEditing.place}
          placeholder='Place'
          onChange={(e) => setAvatarEditing({ ...slideshowEditing, place: e.target.value })}
        />
      </div>
      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default SlideshowEdit