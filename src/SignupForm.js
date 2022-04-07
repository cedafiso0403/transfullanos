import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock, FaCalendarAlt, FaMailBulk } from "react-icons/fa";
import './styles/login.css';


const SignUpForm = (props) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [formMessage, setFormMessage] = useState("");
    const [formStatus, setFormStatus] = useState("Fail");

    const usernameHandlerer = (e) => {
        if (/^[a-zA-Z ]*$/.test(e.target.value)) {
            setName(e.target.value)
            setNameError("");
            setFormMessage("");
        } else {
            setNameError("Name can not contain numbers or special characters");
        }
    }

    const passwordHandlerer = (e) => {
        if (e.target.value.length >= 8) {
            setPasswordError("");
            setFormMessage("");
        } else {
            setPasswordError("Password needs to be at least 8 characters");
        }
        setPassword(e.target.value)
    }

    const emailHandlerer = (e) => {
        setEmail(e.target.value);
        setFormMessage("");
    }

    const dateOfBirthHandlerer = (e) => {
        setdateOfBirth(e.target.value)
        setFormMessage("");
    }

    const logInFormHandlerer = (e) => {
        e.preventDefault();
        axios.post('/api/v1/signup', {
            name: name,
            password: password,
            email: email,
            dateOfBirth: dateOfBirth
        }).then((result) => {
            setFormStatus(result.data.status);
            if (result.data.status === "Fail") {
                setFormMessage(result.data.message);
            } else if (result.data.status === "Success") {
                setFormMessage(result.data.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        < >
            <h2>Sign Up</h2>
            {formStatus === "Fail" ? <form className="signup-form" onSubmit={e => logInFormHandlerer(e)}>
                <label>
                    <FaUserAlt className='input-icons' />
                    <input type="text" onChange={e => usernameHandlerer(e)} value={name} placeholder="Name" required></input>
                    {nameError !== "" ? <p className="input-error">{nameError}</p> : ""}
                </label>
                <label>
                    <FaMailBulk className='input-icons' />
                    <input type="email" onChange={e => emailHandlerer(e)} value={email} placeholder="Email" required></input>
                    {emailError !== "" ? <p className="input-error">{passwordError}</p> : ""}
                </label>
                <label>
                    <FaLock className='input-icons' />
                    <input type="password" onChange={e => passwordHandlerer(e)} value={password} placeholder="Password" required></input>
                    {passwordError !== "" ? <p className="input-error">{passwordError}</p> : ""}
                </label>
                <label>
                    <FaCalendarAlt className='input-icons' />
                    <input type="date" onChange={e => dateOfBirthHandlerer(e)} value={dateOfBirth} placeholder="Date of birth" required></input>
                </label>
                <label>
                    <button type='submit'>Sign up</button>
                </label>
            </form> : " "}
            {formMessage !== "" ? <div className={"form-message "+formStatus}>
                    <p>{formMessage}</p>
                </div> : ""}
            <div className='login-options'>
                <button onClick={e => {
                    props.setDisplayPage("login");
                    setFormStatus("Fail");
                    }}>Back to log in</button>
            </div>
        </>
    )
}

export default SignUpForm;