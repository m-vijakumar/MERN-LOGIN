const express = require('express');
const app = express();
const User = require("./models/newuser");
const cors = require("cors")
const jsonwt = require("jsonwebtoken");
const bodyparser =require('body-parser');
const mongoose =require('mongoose');
const cookieparser =require('cookie-parser')
const key =require("./setup/connect").sceret;
const port =process.env.PORT || 5000;


app.use("/",require("./routers/api/auth"));
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

const db =require("./setup/connect").mongodbURL;
mongoose 
.connect(db,{useNewUrlParser :true})
.then(()=> console.log("mongodb connected"))
.catch(err =>console.log(err))
app.use(cookieparser());
app.get('/',(req, res)=> {

    return res.send({username: "vijaykumar"});
});

app.listen(port,console.log('server is running.....'));
module.exports=app;
