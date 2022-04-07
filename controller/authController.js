require('dotenv').config()
const jwt = require('jsonwebtoken');

//mongodb user model

const User = require('../model/User');

//Password handler
const bcrypt = require('bcrypt');


//Signup
const signUp = (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name == "" || email == "" || password == "" || dateOfBirth == "") {
        res.json({
            status: "Fail",
            message: "All fields are required"
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "Fail",
            message: "Invalid name",
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "Fail",
            message: "Invalid email",
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: "Fail",
            message: "Invalid birth date"
        })
    } else if (password.length < 8) {
        res.json({
            status: "Fail",
            message: "Not valid password"
        })
    } else {
        //Checking if user already exists
        User.find({ email }).then(result => {
            if (result.length) {
                //It already exist
                res.json({
                    status: "Fail",
                    message: "Already an user with that email"
                })
            } else {
                //Try creater new user
                //password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });
                    newUser.save().then(result => {
                        res.set(
                            'content-location', `/api/v1/getprofile/${result._id}`
                        ).json({
                            url :  `/api/v1/getprofile/${result._id}`,
                            status: "Success",
                            message: "User created!",
                            data: result,
                        })
                    }).catch(err => {
                        res.json({
                            status: "Fail",
                            message: "Error while creating user",
                        })

                    })
                }).catch(err => {
                    res.json({
                        status: "Fail",
                        message: "Error while encrypting password"
                    })
                })
            }
        }).catch(err => {
            res.json({
                status: "Fail",
                message: "Error checking if user already exist"
            })
        })
    }

}
//Signin
const logIn = (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (email == "" || password == "") {
        res.json({
            status: "Fail",
            message: "All credentials required"
        });
    } else {
        User.find({ email })
            .then(data => {
                if (data.length) {
                    //User exist
                    const hashedPassword = data[0].password;
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if (result) {
                            const token = jwt.sign({ _id: data[0]._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 600 });
                            res.header("auth-token", token);
                            res.json({
                                status: 'Success',
                                message: "Success log in",
                                token: token,
                                id: data[0]._id
                            })
                        } else {
                            res.json({
                                status: 'Fail',
                                message: "Credentials not valid"
                            })
                        }
                    }).catch(err => {
                        res.json({
                            status: 'Fail',
                            message: "Error while checking credentials",
                            err
                        })
                    })
                } else {
                    res.json({
                        status: 'Fail',
                        message: "Credentials not valid"
                    })
                }
            }).catch(err => {
                res.json({
                    status: 'Fail',
                    message: "Error while checking credentials",
                })
            })
    }
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
                res.json({
                    status: 'Success',
                    message: "Token is valid",
                })
            }
        })
    }
    next();
}

const getProfile = (req, res) => {
    let _id = req.params.id;
    User.find({ _id })
        .then(data => {
            if (data.length) {
                res.json({
                    status: 'Success',
                    message: "Profile found",
                    data: {
                        id: data[0]._id,
                        name: data[0].name,
                        email: data[0].email,
                        dateOfBirth: data[0].dateOfBirth,
                        orders: data[0].orders
                    }
                })
            } else {
                res.json({
                    status: 'Fail',
                    message: "Id not found"
                })
            }
        }).catch(err => {
            res.json({
                status: 'Fail',
                message: "Error while looking for id",
            })
        })
}



module.exports = { signUp, logIn, isAuth, getProfile };