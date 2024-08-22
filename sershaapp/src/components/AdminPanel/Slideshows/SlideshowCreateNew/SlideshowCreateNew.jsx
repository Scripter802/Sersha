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
    const formData = new FormData();
    formData.append('level', slideshowNew.level);
    formData.append('name', slideshowNew.name);
    formData.append('place', slideshowNew.place);
    formData.append('slideImage', slideshowNew.slideImage);

    try {
      const response = await axios.post(`${baseUrl}/Slides`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSlideshowNew({
        slideImage: null,
        name: '',
        level: 0,
        place: 0,
      });
      console.log(response.data);
      setSlideshowCreateNew(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (file) => {
    setSlideshowNew({ ...slideshowNew, slideImage: file });
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
          onChange={(e) => { setSlideshowNew({ ...slideshowNew, name: e.target.value }) }}
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
          value={slideshowNew.place}
          placeholder='Place'
          onChange={(e) => { setSlideshowNew({ ...slideshowNew, place: e.target.value }) }}
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