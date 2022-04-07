import React from 'react';
import {useState} from 'react';
import { VscClose } from "react-icons/vsc";
import LogInForm from './LogInForm';
import SignUpForm from './SignupForm';
import './styles/login.css';


const LogIn = (props) => {

    const [displayPage, setDisplayPage] = useState("login");

    return (
        < >
            <div className='form-container1'>
                <h1>Welcome back</h1>
                <hr></hr>
                <p>Lets start working!</p>
            </div>
            <div className='form-container2'>
                {displayPage === "login" ? <LogInForm setDisplayPage={setDisplayPage} setToken={props.setToken} setIsLogged={props.setIsLogged} setShowModal={props.setShowModal} setLoggedId={props.setLoggedId}/> : "" }
                {displayPage === "signup" ? <SignUpForm  setDisplayPage={setDisplayPage}/> : ""}
            </div>
            <button className="close-modal-button" onClick={e => props.setShowModal(false)}>
                <VscClose />
            </button>
        </>
    )
}

export default LogIn;