import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SiderBarMenu from './SideBarMenu';
import OrderForm from './OrderForm';
import AllOrders from './AllOrders';
import '../styles/dashboard.css';

const Dashboard = (props) => {

    const [img, setImg] = useState("");
    const [allOrders, setAllOrders] = useState([])
    const [refresh, setRefresh] = useState(false);

    const getUserData = (id) => {
        axios.get(`/api/v1/getprofile/${id}`, {}, {headers:{
            "auth-token":localStorage.getItem('auth-token')
        }}).then((result) => {
            setAllOrders(result.data.data.orders);
        }).catch((err) => {
            console.log(err);
        })
    }

    const getImage = () => {
        axios.get("https://randomuser.me/api/").
            then((result) => {
                setImg(result.data.results[0].picture.medium)
            })
            .catch()
    }

    useEffect(() => {
        getImage();
        getUserData(props.loggedId);
    }, [refresh])

    return (
        <>
            <SiderBarMenu setIsLogged={props.setIsLogged} setToken={props.setToken} loggedId={props.loggedId} />
            <main id="main-dashboard">
                <div className='order-container'>
                    <OrderForm token={props.token} loggedId={props.loggedId} refresh={refresh} setRefresh={setRefresh}/>
                    {/* <div className="vl"></div> */}
                    <AllOrders token={props.token} allOrders={allOrders} setAllOrders={setAllOrders} />
                </div>
            </main>
        </>
    )
}

export default Dashboard;