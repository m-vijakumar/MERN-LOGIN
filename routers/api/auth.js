const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const cookie =require("cookie-parser");
const cors =require('cors');
const bcrypt = require("bcrypt");

const jsonwt =require("jsonwebtoken");
const key =require("../../setup/connect").sceret;
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cookie());

router.use(cors())
const NewUser= require("../../models/newuser");

// @type    POST
//@route    /login/auth
// @desc    starting router
// @access  PUBLIC

router.get('/auth',(req, res)=> {

    return res.send([
        {username: "vijaykumar"},
        {username : "kumar"}
        ]);
});
router.post("/auth/login",(req,res)=>{
    const username=req.body.name;
    const password =req.body.password;
    
    NewUser.findOne({username})
    .then(user =>{
        console.log(user)
        if(!user){
            res.json({message : "Invalied UserName or Password"})
        }else{
        const pass =user.password;
        if(password == pass){
            const payload ={
                username: user.username,
           };

            jsonwt.sign(payload,
                key,
                {expiresIn :9000000},
                (err, token) => {
                    res.cookie("auth_t", token, { maxAge: 90000000 });
                    res.send(token)  
                })
        }else{
            res.json({message : "Invalied UserName or Password" })
        }
    }

    })

    .catch(err =>{
        res.json({message : `${err}`})
    })
})

router.post("/auth/register",(req,res)=>{
    
    NewUser.findOne({username:req.body.username})
        .then( new_user=>{

            console.log(new_user)
            if(new_user){
                return res.json({
                    message:'User is Already Registered'});
            }else{
               console.log(req.body.email)
               const userdetails ={
                username: req.body.username,
                };

                const Newuser =new NewUser({
                    username: req.body.username,
                    email:req.body.email,
                    password: req.body.password,
                   profile_link:`localhost:5000/profile/${req.body.username}`,
                })
                Newuser
                .save()
                .then(   
                  jsonwt.sign(userdetails, key,
                    { expiresIn: 3000 },
                     (err, token) => {
                    res.cookie("auth_t", token, { maxAge: 900000 });
                    if(!err){ res.send(token)}
                   else{
                       res.json({error:"error"});
                   }
                     
                  })
                  
                  )
                .catch(err => console.log(err));
 
                }
        })
     .catch(err =>{
        console.log(err)
        res.json({message :'internal error .......'});
        
       
});



})

router.get("/logout", (req, res) => {
    jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
      if (user) {
        res.clearCookie("auth_t").redirect("/")
        
      } else {
        return res
        .status(404)
        .render("home")
      }
    });
  });


module.exports =router;