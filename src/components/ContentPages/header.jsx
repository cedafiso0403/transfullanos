import { Link } from "react-router-dom";
import React from 'react';


const Header = () => {
    return (
        <div>
            <h1>Transfullanos</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/contact">Contact us</Link></li>
                    <li><Link to="/login">Log in</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;