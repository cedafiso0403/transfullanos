import React from 'react';
import axios from "axios";
import Dashboard from './Dashboard/Dashboard';
import ReactModal from 'react-modal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Products from './Products';
import About from './About';
import LogIn from './LogIn';
import { useState, useEffect } from 'react';
import './style.css';

const App = (props) => {
    const [isLogged, setIsLogged] = useState(localStorage.getItem('id'));
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loggedId, setLoggedId] = useState("");

    useEffect(() => {
        axios.post('/api/v1/isauth',{}, {headers:{
            "auth-token":localStorage.getItem('auth-token')
        }}).then((result)=>{
            if(result.data.status === "Success"){
                setLoggedId(localStorage.getItem('id'));
                setIsAuth(true);
            }else{
                setIsAuth(false);
            }
        }).catch((err)=>{
            console.log("Aqui2");
            setIsAuth(false);
        })
    }, [isLogged])

    return (
        <BrowserRouter>
            {!isAuth ?
                <div id="all">
                    <ReactModal
                        isOpen={showModal}
                        className="modal-loggin"
                        overlayClassName="modal-overlay"
                        closeTimeoutMS={400}
                    >
                        <LogIn setIsLogged={setIsLogged} setLoggedId={setLoggedId} setToken={setToken} setShowModal={setShowModal}/>
                    </ReactModal>
                    <Header setShowModal={setShowModal} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/about" element={<About />} />
                        {/* <Route exact path="/contact" element={<Contact />} /> */}
                    </Routes>
                    <Footer />
                </div>
                : <Dashboard setIsLogged={setIsLogged} setToken={setToken} token={token} loggedId={loggedId}/>}
        </BrowserRouter>
    )
}

export default App;