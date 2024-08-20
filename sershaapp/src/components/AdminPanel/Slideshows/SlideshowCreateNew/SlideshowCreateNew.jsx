import React from 'react';
import { useGlobalContext } from '../../../../context/context';
import closeButton from '../../../../assets/images/adminPanel/closeButton.png';
import axios from 'axios';

const SlideshowCreateNew = () => {
  const {
    baseUrl,
    slideshowCreateNew,
    setSlideshowCreateNew,
    slideshowNew,
    setSlideshowNew,
    setAllSlideshows
  } = useGlobalContext();

  const handleSubmit = async () => {
    // const formData = new FormData();
    // formData.append('image', avatarNew.image);
    // formData.append('name', avatarNew.name);

    // try {
    //   const response = await axios.post(`${baseUrl}/avatar`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   setAvatarNew({
    //     image: null,
    //     name: '',
    //   });
    //   console.log(response.data);
    //   setAvatarCreateNew(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleImageChange = (file) => {
    let slideshowItem = [...slideshowNew.slides];
    slideshowItem.gif = file;
    setSlideshowNew({ ...slideshowNew, slides: slideshowItem });
  };

  return (
    <div className="adminPanelCreateNewWrapper">
      <div className="close-btn" onClick={() => setSlideshowCreateNew(false)}>
        <img src={closeButton} alt='close' />
      </div>
      <h3 className="p-3 text-center titleMini" style={{ padding: '.5rem' }}>Create New Slideshow</h3>
      <div>
        <label className='fieldLabel'>Name:</label>
        <input
          className='inputField'
          type="text"
          value={slideshowNew.name}
          placeholder='Name'
          onChange={(e) => { let updatedSlide = [...slideshowNew]; updatedSlide.name = e.target.value; setSlideshowNew({ ...slideshowNew, updatedSlide }) }}
        />
      </div>
      <div>
        <label className='fieldLabel'>Upload Gif:</label>
        <input
          className='inputField'
          type="file"
          onChange={(e) => handleImageChange(e.target.files[0])}
        />
      </div>

      <div>
        <label className='fieldLabel'>Place:</label>
        <input
          className='inputField'
          type="place"
          value={slideshowNew.slides.place}
          placeholder='Place'
          onChange={(e) => { let updatedSlide = [...slideshowNew]; updatedSlide.name = e.target.value; setSlideshowNew({ ...slideshowNew, updatedSlide }) }}
        />
      </div>

      <div>
        <label className='fieldLabel'>Level:</label>
        <input
          className='inputField'
          type="text"
          value={slideshowNew.level}
          placeholder='Level'
          onChange={(e) => setSlideshowNew({ ...slideshowNew, level: e.target.value })}
        />
      </div>
      <button className='submitBtn' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SlideshowCreateNew