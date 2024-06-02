import React from "react";
import { Route, Routes } from "react-router-dom";
import ConfirmationPage from './СonfirmationPage';
import Home from './home';
import SignUp from "./signup";
import Login from "./login";
import ProfilePage from "./profile";
import MainPage from "./main_page";

function App() {
    return(
        <div className='app'>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile/:handle" element={<ProfilePage />}/>
                <Route path="/api/confirm-email/:id" element={<ConfirmationPage />} />
                <Route path="/main" element={<MainPage />}/>
            </Routes>
        </div>
    );
}

export default App;
