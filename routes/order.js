const router = require('express').Router({mergeParams:true});
const {getOrders, createOrder, isAuth} = require("../controller/orderController.js")
const {orderFormValidator} = require('../validator/Order');

router.post('/create', [isAuth,orderFormValidator],createOrder)
router.get('/',[isAuth], getOrders)

    
module.exports = router;