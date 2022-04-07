# Transfullanos - Final Project 2600 Full Stack Web Development I
React Front End

[Transfullanos App](https://transfullanos.herokuapp.com/)

## How to run it

### Scripts

- dev :
- watch: 
- start: 

## Description

## How to use it

## APIs

### API for authentication 

#### API End Points

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

`POST`: `/api/v1/isauth`

Expected response

```js
{
    status: "Success",
    message: "Token is valid",
}
```

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

