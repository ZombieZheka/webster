const ImgPopup = (props) => {
    return (props.trigger) ? ( 
        <div className='image-popup-outer'>
            <div className='image-popup-body'>
                <img src="https://cdn-icons-png.flaticon.com/512/390/390914.png" className='close-btn' onClick = {()=>{
                    props.setTrigger(false);
                }} alt = "close"/>
                {props.children}
            </div>
        </div>
    ) : '';
}
 
export default ImgPopup;