import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const SiderBarMenu = (props) => {

    const [img, setImg] = useState("");
    const [name, setName] = useState("")

    const logOut = (e) => {
        localStorage.clear();
        props.setIsLogged("");
    }

    useEffect(() => {
        axios.get(`/api/v1/getprofile/${props.loggedId}`, {}, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((result) => {
            setName(result.data.data.name)
        }).catch((err) => {
            console.log(err);
        })

        axios.get("https://randomuser.me/api/").
            then((result) => {
                setImg(result.data.results[0].picture.medium)
            })
            .catch()
    }, [])


    return (
        <header>
            <div className="wrapper-sidebar">
                <div className="sidebar">
                    <div className="profile">
                        <img src={img} alt="profile_picture" />
                        <h3>{name}</h3>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="#" className="active">
                                    <span className="item">My orders</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                    <button className="logout-button button-container" onClick={e => logOut(e)}>Log out</button>
                </div>
            </div>
        </header>
    )
}

export default SiderBarMenu;