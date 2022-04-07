const router = require('express').Router({mergeParams:true});
const {logIn, signUp, isAuth, getProfile} = require("../controller/authController.js")


router.post('/login', logIn)
router.post('/signup', signUp)
router.post('/isauth', isAuth)
router.get('/getprofile/:id', getProfile)

    
module.exports = router;