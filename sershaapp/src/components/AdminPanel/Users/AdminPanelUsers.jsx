import React, { useEffect } from 'react'
import { useGlobalContext } from '../../../context/context';

import './adminPanelUsers.css'
import axios from 'axios';
import UserDetailsPopup from './UserDetailsPopup/UserDetailsPopup.jsx';

const AdminPanelUsers = () => {
    const { baseUrl, allUsers, setAllUsers, setSelectedUser, selectedUser } = useGlobalContext();

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(`${baseUrl}/User/list`);
                setAllUsers(response.data);
                console.log(allUsers)
            } catch (error) {
                console.error('Error fetching all users:', error);
            }
        };

        fetchAllUsers();
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
    };

    const handleDelete = (userId) => {

    };

    const handleEdit = (userId) => {

    };

    return (
        <div className="userContainer">
            <div className='titleWrapper'>
                <h3 className="p-3 text-center">All Users</h3>

            </div>
            {/* <button className="create-post-btn">Create New Post</button> */}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Date of signup</th>
                        <th>Current level</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers && allUsers.map((user, index) =>
                        <tr key={user.id} onClick={() => handleUserClick(user)} className='pointer'>
                            <td data-label="No.">{index + 1}</td>
                            <td data-label="Username">{user?.fullName}</td>
                            <td data-label="Email">{user?.email}</td>
                            <td data-label="Date of signup">{user?.signupDate}</td>
                            <td data-label="Current level">{user?.level}</td>
                            {/* <td className='settingsData'>
                            <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                        </td> */}
                        </tr>
                    )}
                </tbody>
            </table>
            {selectedUser && <UserDetailsPopup user={selectedUser} onClose={handleClosePopup} />}
        </div>
    );
}

export default AdminPanelUsers
