require('dotenv').config()
const jwt = require('jsonwebtoken');

//mongodb user model

const { Order } = require('../model/Order');
const User = require('../model/User');


//Signup
const createOrder = (req, res) => {
    let { weight, width, height, length, fromCountry, fromCity, toCountry, toCity, date, description, id } = req.body;
    if (res.locals.formErrors.length > 0) {
        res.json({
            status: 'Fail',
            message: "Encounter an error while validating the information",
        }).status(500)
    } else {
        User.findOne({ "_id": id }).exec((err, user) => {
            if (err) {
                res.json({
                    status: 'Fail',
                    message: "Encounter an error while validating id the order",
                }).status(500)
            } else if (user != null) {
                const newOrder = new Order({ weight, width, height, length, fromCountry, fromCity, toCountry, toCity, date, description });
                user.orders.push(newOrder);
                user.save().then((result) => {
                    res.set('content-location', `/api/v1/order/`).json({
                        status: 'Success',
                        url: `/api/v1/order/`,
                        data: newOrder
                    }).status(201)
                }).catch((err) => {
                    res.json({
                        status: 'Fail',
                        message: "Encounter an error while adding the order",
                    }).status(500)
                });
            } else {
                res.json({
                    status: 'Fail',
                    message: "Could not connect to you id, try log out and log in again",
                }).status(500)
            }
        })
    }
}
//Signin
const getOrders = (req, res) => {

}

const isAuth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.json({
            status: 'Fail',
            message: "Not token",
        })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({
                    status: 'Fail',
                    message: "Fail to authenticate",
                })
            } else {
                req.auth = "verified"
                next();
            }
        })
    }
}

module.exports = { getOrders, createOrder, isAuth };