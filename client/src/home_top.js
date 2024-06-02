import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-scroll';

import { logout, reset } from './features/auth/authSlice'; 

import home_btn from './images/home.png'
import logout_btn from './images/logout.png'
import signup_btn from './images/signup.png'
import login_btn from './images/login.png'

const HomeTop = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth)

    const handleClick = () => {
        navigate('/signup')
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return ( 
        <div className='hometop' id='hometop'>
            
            <div className='navbar'>
                <h1>Udemy</h1>
                <div className='links'> 
                    <Link to='hometop' spy={true} smooth={true} offset={0} duration={500}><div className='links-first'><img src={home_btn} alt='navbar'></img></div></Link>
                    {!user && <a href='/signup'><div className='links-signup'><img src={signup_btn} alt='navbar'></img></div></a>}
                    {!user &&<a href='/login'><div className='links-login'><img src={login_btn} alt='navbar'></img></div></a>}
                    {user && <div className='links-last'  onClick={onLogout}><button className='logout' onClick={onLogout}><img src={logout_btn} alt='navbar'></img></button></div>}
                </div>
            </div>

            <div className='homebody' id='homebody'>
                <div className='content'>
                    <h3>{`Are you bored at home?)`}</h3>
                    <h4>{`Do you want to have an interesting evening?)`}</h4>
                    <br></br>
                    <h1>So let's get started!</h1>
                    <button onClick={handleClick} className='get-started'> Let's go!</button>
                    
                </div>
            </div>
            
        </div>
 

    );
}
 
export default HomeTop;