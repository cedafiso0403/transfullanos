import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from "react-icons/fa";
import './styles/login.css';


const LogIn = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameHandlerer = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandlerer = (e) => {
        setPassword(e.target.value)
    }

    const logInFormHandlerer = (e) => {
        e.preventDefault();
        axios.post('/api/v1/login', {
            email: username,
            password: password
        }).then((result) => {
            if (result.data.status === "Success") {
                localStorage.setItem("auth-token", result.data.token);
                localStorage.setItem("id", result.data.id);
                navigate("/");
                props.setIsLogged(true);
                props.setShowModal(false);
            } else {
                props.setIsLogged(false);
            }
        }).catch((err) => {
            props.setIsLogged(false);
        })
        setUsername("");
        setPassword("");
    }

    return (
        < >
                <h2>Login</h2>
                <form onSubmit={e => logInFormHandlerer(e)}>
                    <label>
                        <FaUserAlt className='input-icons' />
                        <input type="text" onChange={e => usernameHandlerer(e)} value={username} placeholder="Email"></input>
                    </label>
                    <label>
                        <FaLock className='input-icons' />
                        <input type="password" onChange={e => passwordHandlerer(e)} value={password} placeholder="Password"></input>
                    </label>
                    <label>
                        <button type='submit'>Log In</button>
                    </label>
                </form>
                <div className='login-options'>
                    <button onClick={e => props.setDisplayPage("signup")}>Or Sign up</button>
                    <button>Forgot password?</button>
                </div>
        </>
    )
}

export default LogIn;