const router = require('express').Router({mergeParams:true});


const authRouter = require("./auth.js");
const orderRouter = require("./order");


router.use('/', authRouter);
router.use('/order', orderRouter);

module.exports = router;