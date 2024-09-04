import axios from 'axios';
import React from 'react'
import { useGlobalContext } from '../../../../context/context'
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import Dropzone from 'react-dropzone';
import './slideshowEdit.css';


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
    formData.append('id', slideshowEditing?.id);
    formData.append('level', slideshowEditing?.level);
    formData.append('name', slideshowEditing?.name);
    formData.append('place', slideshowEditing?.place);
    formData.append('slideImage', slideshowEditing?.slideImage);

    try {
      const response = await axios.put(`${baseUrl}/Slides/${slideshowEditing?.id}`, formData, {
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
    setSlideshowEditing({ ...slideshowEditing, slideImage: file[0], filePath: null });
  };

  console.log(slideshowEditing)
  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setIsSlideshowEdit(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini" style={{ padding: '.5rem' }}>Edit Slideshow</h3>
      <div>
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
        <label className='fieldLabel'>Upload Gif:</label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzoneAuthor">
              <input {...getInputProps()} />
              {slideshowEditing ? (
                <img
                  src={
                    slideshowEditing?.slideImage instanceof File
                      ? URL.createObjectURL(slideshowEditing?.slideImage)
                      : slideshowEditing?.filePath
                        ? `${baseUrlImage}/${slideshowEditing?.filePath}`
                        : null
                  }
                  alt="slideshow gif"
                  className="uploaded-Slideshow-image slideGif"
                />
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
          onChange={(e) => setSlideshowEditing({ ...slideshowEditing, level: e.target.value })}
        />
      </div>
      <div>
        <label className='fieldLabel'>Place:</label>
        <input
          className='inputField'
          type="text"
          value={slideshowEditing.place}
          placeholder='Place'
          onChange={(e) => setSlideshowEditing({ ...slideshowEditing, place: e.target.value })}
        />
      </div>
      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default SlideshowEdit