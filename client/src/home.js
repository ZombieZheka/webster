import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth)

    const handleClick = () => {
        navigate('/signup')
    }

    return ( 
            <div className='homebody' id='homebody'>
                <div className='content'>
                    <h3>{`Are you bored at home?)`}</h3>
                    <h4>{`Do you want to have an interesting evening?)`}</h4>
                    <br></br>
                    <h1>So let's get started!</h1>
                    <button onClick={handleClick} className='get-started'> Sign Up!</button>
                    
                </div>
            </div>
            
    );
}
export default Home;