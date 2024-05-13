import React from 'react'
import { useGlobalContext } from '../../../context/context';

import './users.css'

const Users = () => {
    const { allUsers, setAllUsers } = useGlobalContext();

    const handleDelete = (userId) => {

    };

    const handleEdit = (userId) => {

    };

  return (
    <div className="userContainer">
            <h3 className="p-3 text-center">All Users</h3>
            {/* <button className="create-post-btn">Create New Post</button> */}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Date of signup</th>
                        <th>Current level</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers && allUsers.map(user =>
                        <tr key={user.id}>
                            <td> {user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.signupDate}</td>
                            <td>{user.currentLevel}</td>
                            {/* <td className='settingsData'>
                                <button className="edit-btn" onClick={() => handleEdit(post.id)}>Edit</button>
                            
                                <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                            </td> */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users