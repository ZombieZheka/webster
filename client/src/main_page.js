import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { store } from './redux/store.js';
import Navbar from './navbar.js';
import PhotoEditor from './PhotoEditor.js'; // Import PhotoEditor

const MainPage = () => {
    const profileID = useParams().handle;

    const [isSameUser, setIsSameUser] = useState(true);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/dash/main`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + store.getState().auth.user.accessToken
            },
            body: JSON.stringify({ user_id: store.getState().auth.user.user_id })
        }).then((response) => {
            response.json().then((body) => {
                setIsSameUser(body.isSame);
            });
        });
    }, [profileID]);

    useEffect(() => {
        if (rerender) {
            fetch(`http://localhost:4000/dash/main`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + store.getState().auth.user.accessToken
                },
                body: JSON.stringify({ user_id: store.getState().auth.user.user_id })
            }).then((response) => {
                response.json().then((body) => {
                    setIsSameUser(body.isSame);
                });
            });
            setRerender(false);
        }
    }, [rerender, profileID]);

    return (
        <div>
            <Navbar inProfile={isSameUser}  handleRerender ={setRerender} />
            <PhotoEditor></PhotoEditor>
        </div>
    );
};

export default MainPage;
