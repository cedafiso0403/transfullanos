import { Link } from "react-router-dom";
import React from 'react';
import './styles/header.css';


const Header = (props) => {

    const handleModal = (e) => {
        props.setShowModal(true);
    }

    return (
        <header id="header_box">
            <h1>TRANSFULLANOS</h1>
            <nav id="header_navbox">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {/* <li><Link to="/products">Products</Link></li> */}
                    <li><Link to="/about">About us</Link></li>
                    {/* <li><Link to="/contact">Contact us</Link></li> */}
                    <button className="text-color" id="login-button" onClick={e => handleModal(e)}>Log in</button>
                </ul>
            </nav>
        </header>
    )
}

export default Header;