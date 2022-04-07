import React from 'react';
import { useState } from 'react';
import axios from 'axios';


const OrderForm = (props) => {

    const [weight, setWeight] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [length, setLength] = useState("");
    const [fromCountry, setFromCountry] = useState("Canada");
    const [fromCity, setFromCity] = useState("");
    const [toCountry, setToCountry] = useState("");
    const [toCity, setToCity] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const setBlankFields = () => {
        setWeight("");
        setWidth("");
        setHeight("");
        setLength("");
        setFromCountry("");
        setFromCity("");
        setToCountry("");
        setToCity("");
        setDescription("");
        setError("");
        setDate("");
    }

    const weightHandler = (e) => {
        if (!isNaN(e.target.value) && e.target.value > 0) {
            setWeight(e.target.value);
        }
    }

    const widthHandler = (e) => {
        if (!isNaN(e.target.value) && e.target.value > 0)
            setWidth(e.target.value);
    }

    const heightHandler = (e) => {
        if (!isNaN(e.target.value) && e.target.value > 0)
            setHeight(e.target.value);
    }

    const lengthHandler = (e) => {
        if (!isNaN(e.target.value) && e.target.value > 0)
            setLength(e.target.value);
    }

    const fromCountryHandler = (e) => {
        setFromCountry(e.target.value);
    }

    const fromCityHandler = (e) => {
        setFromCity(e.target.value)
    }

    const toCountryHandler = (e) => {
        setToCountry(e.target.value);
    }

    const toCityHandler = (e) => {
        setToCity(e.target.value)
    }

    const dateHandler = (e) => {
        if (!!new Date(e.target.value).getTime())
            setDate(e.target.value);
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value);
    }

    const formOrderHandler = (e) => {
        e.preventDefault();
        axios.post('/api/v1/order/create', {
            weight,
            width,
            height,
            length,
            fromCountry,
            fromCity,
            toCountry,
            toCity,
            date,
            description,
            id: props.loggedId
        }, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((result) => {
            if (result.data.status === "Fail") {
                setError(result.data.message)
            } else {
                setBlankFields();
            }
            props.setRefresh(!props.refresh);
        }).catch((err) => {
            console.log("FAIL")
        })
    }
    return (
        <>
            <form className="order-form-container" onSubmit={e => formOrderHandler(e)}>
                <h2>Create a order</h2>
                <hr></hr>
                <label>
                    <div className="section-container dimensions">
                        <label>
                            Weight:<br></br>
                            <input type="number" placeholder='kg' min="0" onChange={e => weightHandler(e)} value={weight}></input>
                        </label>
                        <label>
                            Date:<br></br>
                            <input type="date" onChange={e => dateHandler(e)} value={date}></input>
                        </label>

                    </div>
                </label>
                <label>
                    Dimensions:<br></br>
                    <div className="section-container dimensions">
                        <label>
                            Width:<br></br>
                            <input type="number" placeholder='mm' min="0" onChange={e => widthHandler(e)} value={width}></input>
                        </label>
                        <label>
                            Height:<br></br>
                            <input type="number" placeholder='mm' min="0" onChange={e => heightHandler(e)} value={height}></input>
                        </label>
                        <label>
                            Length:<br></br>
                            <input type="number" placeholder='mm' min="0" onChange={e => lengthHandler(e)} value={length}></input>
                        </label>
                    </div>
                </label>
                <label>
                    From:<br></br>
                    <div className="section-container">
                        <label>
                            Country: <br></br>
                            <input type="text" onChange={e => fromCountryHandler(e)} value={fromCountry}></input>
                        </label>
                        <label>
                            City: <br></br>
                            <input type="text" placeholder='City' onChange={e => fromCityHandler(e)} value={fromCity}></input>
                        </label>
                    </div>
                </label>
                <label>
                    To:<br></br>
                    <div className="section-container">
                        <label>
                            Country: <br></br>
                            <input type="text" placeholder='Country' onChange={e => toCountryHandler(e)} value={toCountry}></input>
                        </label>
                        <label>
                            City: <br></br>
                            <input type="text" placeholder='City' onChange={e => toCityHandler(e)} value={toCity}></input>
                        </label>
                    </div>
                </label>
                <label>
                    Description of the content:<br></br>
                    <textarea rows="2" onChange={e => descriptionHandler(e)} value={description}></textarea>
                </label>
                <p className="form-error">{error}</p>
                <input type="submit" value="Create order"></input>
            </form>
        </>
    )
}

export default OrderForm;