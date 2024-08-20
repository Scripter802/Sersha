import React from 'react'
import SlideshowCreateNew from './SlideshowCreateNew/SlideshowCreateNew'
import SlideshowEdit from './SlideshowEdit/SlideshowEdit'
import { useGlobalContext } from '../../../context/context'

import './slideshows.css'

const Slideshows = () => {
  const { baseUrl, baseUrlImage, slideshowCreateNew, setSlideshowCreateNew, isSlideshowEdit, setIsSlideshowEdit, slideshowEditing, setSlideshowEditing, allSlideshows, setAllSlideshows } = useGlobalContext();




  return (
    <>
      {slideshowCreateNew ? (
        <SlideshowCreateNew />
      ) : isSlideshowEdit ? (
        <SlideshowEdit />
      ) : (
        <div className="clothing-page">
          <div className='titleWrapper'>
            <h3>Avatar</h3>
            <button className="create-new-item-btn" onClick={() => setSlideshowCreateNew(true)}>
              Create New Avatar
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
                item.slides.map(slide => (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center" }}>{slide.name}</td>
                    <td>
                      {/* <img src={`${baseUrlImage}${item.imagePath}`} alt={`Clothing ${item.id}`} className="clothing-image" /> */}

                    </td>
                    <td style={{ textAlign: "center" }}>{slide.place}</td>
                    <td style={{ textAlign: "center" }}>{item.level}</td>
                    <td className='settingsData'>
                      <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Slideshows