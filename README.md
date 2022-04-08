# Transfullanos - Final Project 2600 Full Stack Web Development I

[Transfullanos App](https://transfullanos.herokuapp.com/)

## Description

This is my final project for the 2600 Full Stack Web Development I class! The purpose of this project was to create a website for a dummy transport company that allows customers to log in to their accounts and create their orders directly on the website.

Future plans for the website:
- Implementing sending email verification
- Implementing edit profile
- Implementing a follow up system for orders
- Implementing editing orders

## How to run it
### Scripts

There are 3 essential scripts to run the application depending on what you want to do, below is a brief description of them. Remember that you must use npm run to run them

- dev : It will run the application and restart it automatically every time it notices a change in the root directory.
- watch: It will rebuild the project automatically every time it notices a change in the root directory
- start: The app will run, but it will not restart or be affected by changes made to it while it is running.

## How to use it

On the home of the website, you can use the navigation bar in the header, to jump between the different views of the website or log in to your account. By clicking on the login button it will open a modal where you can enter your credentials and access your account, feel free to create your account but be aware that there is still no password recovery system so remember you credentials well or you can use the test ones (`"email" : "test@test.com", "password": "test1234",`), and inside you can see all your orders and create new ones whenever you want, when your visit is over you can log out using the button at the bottom left inside the left menu bar.

## Feautures

- Authentication Section
- Registration section, with encryption system for the password
- Use of web token to access the information of your personal account, you cannot access the information if you have not been authenticated and received a web token

## APIs

### API for authentication 

#### API Endpoints

##### Creating an account
Create an account with your information in the database

`POST`: `/api/v1/signup`
Expected body 
```js
{
    name: "Jhon Smith",
    password: "secretPassword",
    email: "test@test.com",
    dateOfBirth: "28-02-1990"

}
```
Expected response
```js
{
    url :  `/api/v1/getprofile/624f987a67e89d576c5b3795`,
    status: "Success",
    message: "User created!",
    data: {
        _id: "624f987a67e89d576c5b3795",
        name:"Jhon Smith",
        email: "test@test.com",
        password: "$2b$10$wMTklikeLRiAxbDJVhWzT.sOzlpgyPrODFUB/m.5CaHlcK57JBLkS",
        dateOfBirth: "1990-02-28:00:00.000Z",
        orders: [],
        __v: 0
    },
}
```
##### Creating an account
It will receive the authentication credentials and determine if they are valid, if so, it will send back a web token that will give you access to the enpoints related to the information of that account
`POST`: `/api/v1/login`
Expected body 
```js
{
    email: "test@test.com",
    password: "Test1234"
}
```
Expected response
```js
{
    status: 'Success',
    message: "Success log in",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCXVCJ9.eyJfaWQiOiI2MjRjYzVhMGQ4YTASDASsadSADSAsadmEiLCJpYXQiOjE2NDkzNzQwODIsImV4cCI6MTY0OTM3NDY4Mn0.22KGBXn3GRnQwiZrf_8u_ay9P9cTCQQpbVwjjpyI_co",
    id: "624f987a67e89d576c5b3795"
}
```
##### Validating web tokens
It will check if your web token is valid, be aware that it will look for this token in the request header under the name auth-token
`POST`: `/api/v1/isauth`
Expected response
```js
{
    status: "Success",
    message: "Token is valid",
}
```
##### Get information of the account
It will retrieve all the information attached to the id account requested, be aware that you will need a valid web token to have access to this information
`GET`: `/api/v1/getprofile/:id`
Expected response
```js
{
    status: 'Success',
    message: "Profile found",
    data: {
        _id: "624f987a67e89d576c5b3795",
        name:"Jhon Smith",
        email: "test@test.com",
        dateOfBirth: "1990-02-28:00:00.000Z",
        orders: [{
            _id:"624f5712b99c55001635086a",
            weight:1,
            width:1,
            height:1,
            length:1,
            fromCountry:"canada",
            fromCity:"vancouver",
            toCountry:"colombia",
            toCity:"barranquilla",
            date: "2022-04-15T00:00:00.000+00:00",
            description:"test",
            }
        ],
        __v: 0
    }
}
```
### API for order handlening 

#### API Endpoints

`POST`: `/api/v1/order/create`
##### Creating an order inside
It will add an order to the account corresponding requested through the id, keep in mind that you will need a valid web token to access this endpoint.
Expected body 
```js
{
    weight: 1,
    width: 1,
    height: 1,
    length: 1,
    fromCountry: "Canada",
    fromCity: "Vancouver",
    toCountry: "Colombia",
    toCity: "Barranquilla",
    date: "28-02-1990",
    description: "Test",
    id: "624f987a67e89d576c5b3795"
}
```
Expected response
```js
{
    status: 'Success',
    url: `/api/v1/order/`,
    data: {
        _id:"624f5712b99c55001635086a",
        weight:1,
        width:1,
        height:1,
        length:1,
        fromCountry:"canada",
        fromCity:"vancouver",
        toCountry:"colombia",
        toCity:"barranquilla",
        date: "2022-04-15T00:00:00.000+00:00",
        description:"test",
    }
}
```