const router = require('express').Router({mergeParams:true});
const {createOrder, isAuth} = require("../controller/orderController.js")
const {orderFormValidator} = require('../validator/Order');

router.post('/create', [isAuth,orderFormValidator],createOrder)

    
module.exports = router;