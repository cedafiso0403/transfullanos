import React from 'react';
import Order from './Order';


const AllOrders = (props) => {

    return (
        <div className="order-container-all">
            <h2>Orders</h2>
            <hr></hr>
            <Order description={"Description"}  fromCountry={"From"} toCountry={"To"}></Order>
            {props.allOrders.map((elem)=>{
                return <Order key={elem._id} {...elem} ></Order>
            })}
        </div>
    )
}

export default AllOrders;