import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { store } from './redux/store.js'
import { logout, reset } from './features/auth/authSlice'; 


import create_btn from './images/create.png'
import logout_btn from './images/logout.png'
import profile_btn from './images/profile.png'

const Navbar = () => {
    const profileID = store.getState().auth.user.user_id

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState(null);
    const [rerender, setRerender]  = useState();
    
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    useEffect(() => {
        fetch(`http://localhost:4000/dash/profile/${profileID}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({user_id: store.getState().auth.user.user_id})
        }).then(response => {
            response.json().then((body)=>{
                setUserDetails(body.user)
            })
        })
    }, [profileID]); 


    return (
        <div className='navbar'>
            <h1>Udemy</h1>
            <div className='links'> 
                <a href= {`/main`}><div className='links-first'><img src={create_btn} alt='navbar'></img></div></a>
                <a href= {`/profile/${store.getState().auth.user.user_id}`}><div className='links-fifth'><img src={profile_btn} alt='navbar'></img></div></a>
                <div className='links-last'  onClick={onLogout}><button className='logout' onClick={onLogout}><img src={logout_btn} alt='navbar'></img></button></div>

            </div>

            
        </div>
    );
}
 
export default Navbar;