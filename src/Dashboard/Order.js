import React from 'react';
import {useState, useEffect} from 'react';


const Order = (props) => {

    const [date, setDate] = useState(new Date(props.date))

    return (
        <div className='order'>
            <p className="from-bold">{props.date !== undefined ? (date.getDate()+1)+"/"+(date.getMonth()+1)+"/"+date.getFullYear(): "Date"}
            </p>
            {props.description === "Description" ? <p className='description-header'>
                {props.description}
            </p>: <p>{props.description}</p>}
            <p className="from-bold">{props.fromCountry}<br></br> {props.fromCity}</p>
            <p className="from-bold">{props.toCountry}<br></br> {props.toCity}</p>
        </div>
    )
}

export default Order;