const express = require('express');
const app = express();

const connection = require("./db/connection.js");
const router = require("./routes/index.js");
const cors = require('cors');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, Content-Type, Accept");
    next();
})


app.use('/api/v1/', router, (req, res) =>{

});


connection.then(()=>{
    console.log("Connected to database!");
    const server = app.listen(process.env.PORT || 8080, ()=>console.log("listening"));

})


