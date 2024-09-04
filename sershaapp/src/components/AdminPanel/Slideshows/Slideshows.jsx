import React, { useEffect } from 'react'
import SlideshowCreateNew from './SlideshowCreateNew/SlideshowCreateNew'
import SlideshowEdit from './SlideshowEdit/SlideshowEdit'
import { useGlobalContext } from '../../../context/context'

import './slideshows.css'
import axios from 'axios'

const Slideshows = () => {
  const { baseUrl, baseUrlImage, fetchSlideshows, slideshowCreateNew, setSlideshowCreateNew, isSlideshowEdit, setIsSlideshowEdit, slideshowEditing, setSlideshowEditing, allSlideshows, setAllSlideshows } = useGlobalContext();

  useEffect(() => {
    fetchSlideshows();

  }, [slideshowCreateNew, isSlideshowEdit]);

  const handleEdit = (item) => {
    setSlideshowEditing(item);
    setIsSlideshowEdit(true);
    console.log(`Editing item with id ${item.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/Slides/${id}`);
      if (response.status === 200 || 204) {

        const updatedSlideshows = allSlideshows.filter(q => q.id !== id);
        setAllSlideshows(updatedSlideshows);
      }
    } catch (error) {
      console.error('Error deleting Avatar:', error);
    }
    console.log(`Deleting avatar with id ${id}`);
  };



  return (
    <>
      {slideshowCreateNew ? (
        <SlideshowCreateNew />
      ) : isSlideshowEdit ? (
        <SlideshowEdit />
      ) : (
        <div className="clothing-page">
          <div className='titleWrapper'>
            <h3>Slideshows</h3>
            <button className="create-new-item-btn" onClick={() => setSlideshowCreateNew(true)}>
              Create New Slideshow
            </button>
          </div>
          <table className="clothing-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gif</th>
                <th>Place</th>
                <th>Level</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {allSlideshows?.map((item) => (
                <tr key={item?.id}>
                  <td style={{ textAlign: "center" }}>{item?.name}</td>
                  <td>
                    <img src={`${baseUrlImage}${item?.filePath}`} alt={`Clothing ${item.id}`} className="clothing-image" />

                  </td>
                  <td style={{ textAlign: "center" }}>{item.place}</td>
                  <td style={{ textAlign: "center" }}>{item.level}</td>
                  <td className='settingsData'>
                    <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Slideshows