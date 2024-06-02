import React, { useState, useEffect } from 'react';
import { store } from './redux/store';
import './stylesheets/profile.css';

const ConfirmationPage = () => {
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const user_id = store.getState().auth.user.user_id;

    useEffect(() => {
        if (user_id) {
            fetch(`http://localhost:4000/api/confirm-email/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + store.getState().auth.user.accessToken,
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to confirm email');
                }
                setConfirmationMessage('Your email has been successfully confirmed');
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setConfirmationMessage('Failed to confirm email!');
            });
        }
    }, [user_id]);

    return (
        <div className="confirmation-page">
            <div className="my-form">
                <h1>{confirmationMessage}</h1> 
                <a href={`http://localhost:4000/profile/${user_id}`} className="back-button">Back to Profile</a>
            </div>
        </div>
    );
}

export default ConfirmationPage;
