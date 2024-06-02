import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { store } from './redux/store.js'
import Navbar from './navbar.js';

import './stylesheets/profile.css';

const ProfilePage = () => {
    
    const profileID = useParams().handle
    const navigate = useNavigate()

    const [isSameUser, setIsSameUser] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [interestedEvents, setInterestedEvents] = useState([]);
    const [showPosts, setShowPosts] = useState(true);
    const [showInterested, setShowInterested] = useState(false);
    const [rerender, setRerender]  = useState();
    const [changeUserBio, setChangeUserBio] = useState('');
    const [user_image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{

        fetch(`http://localhost:4000/dash/profile/${profileID}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
        body: JSON.stringify({user_id: store.getState().auth.user.user_id})
        }).then((response)=>{
            response.json().then((body)=>{
                setIsSameUser(body.isSame)
                setUserDetails(body.user)
                
            })
        })
    }, [])

    useEffect(()=>{
        if(rerender){
            fetch(`http://localhost:4000/dash/profile/${profileID}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
            body: JSON.stringify({user_id: store.getState().auth.user.user_id})
            }).then((response)=>{
                response.json().then((body)=>{
                    setIsSameUser(body.isSame)
                    setUserDetails(body.user)
                    
                })
            })
            setRerender(false);
        }        
    }, [rerender])

    useEffect(()=>{
        if(!isSameUser){
            fetch(`http://localhost:4000/dash/profile/${store.getState().auth.user.user_id}`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken}
            }).then((response)=>{
                response.json().then((body)=>{
                    setCurrentUser(body)
                })
            })
        }
    }, [isSameUser])


    const handleSubmit = (e) => {
        e.preventDefault();
        let userBio = changeUserBio
        if(!userBio){
            if(currentUser && currentUser.user_bio){
                userBio = currentUser.user_bio
            }
            else{
                userBio = " "
            }
        }

        const formData = new FormData();
        formData.append('user_img', user_image);
        fetch('http://localhost:4000/api/image/user', {
                method: 'POST',
                body: formData
        }).then((response)=>{
            response.json().then((body)=>{

                fetch(`http://localhost:4000/dash/profile/${store.getState().auth.user.user_id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer: '+ store.getState().auth.user.accessToken},
                    body: JSON.stringify({user_id: store.getState().auth.user.user_id, user_img: body.imgPath, user_bio: userBio})
                }).then(()=>{
                    setRerender(true);
                    setIsUpdating(false);
                })
            })
        })
    }

    const handleButtonClick = async () => {
        try {
            setShowModal(true); 

            const response = await fetch('http://localhost:4000/api/sendConfirmationEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userDetails.user_email,
                    link: `http://localhost:${window.location.port}/api/confirm-email/${userDetails._id}`
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки запроса');
            }
    
            const data = await response.json();
            console.log(data); // Вывод ответа от сервера в консоль
        } catch (error) {
            console.error('Ошибка:', error);
            // Обработка ошибок при отправке запроса
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar inProfile={isSameUser}  handleRerender ={setRerender} />
            {userDetails &&
            <div className='profile-outer'>
                <div className='profile-user-top'>
                    <div className='profile-user-image'>
                        <img src= {`http://localhost:4000/api/image/user/${userDetails.user_img}`}></img>
                        {isSameUser && isUpdating && (
                            <div>
                                <div className='profile-image-upload'>
                                    <form onSubmit={handleSubmit}>
                                        <label className='profile-image-upload-label'>
                                        <p>Select Image</p>
                                        <input 
                                            className='user_img'
                                            name='user_img'
                                            type='file'
                                            onChange = {(e)=>{
                                                if(e.target.files[0] && (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg')){
                                                    setImage(e.target.files[0]);
                                                }
                                                else{
                                                    setImage(null);
                                                }
                                            }}
                                            accept= 'image/png, image/jpeg'
                                        ></input>
                                        </label>
                                        <textarea className='profile-bio' placeholder='Add a bio' onChange={(e)=>{setChangeUserBio(e.target.value)}} maxLength={150}></textarea>
                                        <button type='submit'>Update</button>
                                    </form>
                                </div>
                    
                            </div>
                        )}
                    </div>
                    <div className='profile-user-details'>
                        <div className='profile-user-details-1'>
                            <p className='profile-username'>{userDetails.user_name}</p>
                            {isSameUser && !isUpdating && <button className='profile-update' onClick={()=>{setIsUpdating(true)}}>Edit Profile</button>}
                            {isSameUser && !userDetails.user_emailConfirmed && !isUpdating && <button className='profile-update' onClick={handleButtonClick}>Confirm Email</button>}
                            {isSameUser && isUpdating && <button className='profile-update-cancel' onClick={()=>{setIsUpdating(false)}}>Cancel</button>}
                        </div>
                        <div className='profile-user-details-2'>
                            <p><span>{userDetails.user_posts.length}</span> posts</p>
                        </div>
                        <div className='profile-user-details-3'>
                            {!isUpdating && <div className='bio-empty'></div>}
                            {!isUpdating && userDetails.user_bio && <p>{userDetails.user_bio}</p>}
                            {isUpdating && <div className='bio-toggle'></div>}
                        </div>
                    </div>
                </div>

                {/* <div className='profile-toggle'>
                    {!isSameUser && (<button className='profile-toggle-special' onClick={()=>{setShowPosts(true); setShowInterested(false)}}>Posts</button>)}   
                    {isSameUser && userDetails.user && (<button onClick={()=>{setShowPosts(true); setShowInterested(false)}}>Posts</button>)}
                    {isSameUser && (<button onClick={()=>{setShowPosts(false); setShowInterested(true)}}>Liked</button>)}
                </div>

                <div className='profile-user-posts'>
                    {showPosts && (<Cards cards={userEvents} inProfile={isSameUser} currentUser={store.getState().auth.user.user_id} handleRerender ={setRerender} sameUser={isSameUser} notInLiked={showInterested}/>)}
                    {showInterested && (<Cards cards={interestedEvents} inProfile={isSameUser} currentUser={store.getState().auth.user.user_id} handleRerender ={setRerender} sameUser={isSameUser} notInLiked={showInterested}/>)}
                </div> */}

                
            </div>
            }
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>The letter has been sent to you</h2>
                        <p>Confirm your email by clicking on the link in the email</p>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;