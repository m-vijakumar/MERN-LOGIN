import React from 'react'
import {Link ,Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import Dashboard from './Dashboard'
export default  withRouter(function  Register(props) {


  const [userData, setUserData] = useState({});
  const [errMessage, setErrMessage] = useState("");
  
  const [isSpinner,setSpinner] =useState(true);
  const [isSpinner1,setSpinner1] =useState(false);

  useEffect(async () => {

      await fetch('/auth'

      ).then(res =>{console.log(res)})
      setSpinner(false)
  }, []);


  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    //console.log("vijay")
  };

  const handleSubmit = async () => {

    if(!userData.email || !userData.username ||! userData.password ){

      setErrMessage("fill the details")
    }else{
    const userdata = {
      email: userData.email,
      username : userData.username,
      password: userData.password
    };
 
      setSpinner1(true)
    const response = await fetch('/auth/register' , {
    method: "POST",
    headers: {
      'Content-type': 'application/json'

    },
    mode:'cors',
    body :JSON.stringify(userdata)
  })
  setSpinner1(false)
  const data = await response.json();
  console.log(data)
  if (data.success === true) {
   
    console.log(data.success)
    props.history.push("/dashboard");
    //return <Redirect to="/Dashboard" />
    
  }else{ setErrMessage(data.message) }

    }
  }
  const sp1 =  <button class="btn btn-success" type="button" disabled>
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>

const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Register"} className="btn btn-success , App" onClick={handleSubmit} />
    if (isSpinner) {
      return (
        <div className="spinner-border" role="status" id="spinner">
        <span className="sr-only">Loading...</span>
        </div> 
      )
  }else{
    return (
         
        <div className="App">
        <h3>Welcome</h3>
       
        <table className="login" onChange={handleChange}>
        <tr>
        <td><p>Email  : </p></td><td><input type="email" name="email" /></td>
        </tr>
        <tr>
        <td><p>Username  : </p></td><td><input type="text" name="username" /></td>
        </tr>
        <tr>
        <td><p>Password  : </p></td><td><input type="password" name="password" /></td>
        </tr>

        <br />
       
        {isSpinner1 ? sp1 :sp }
        </table>
       
        <br />
        <Link to="/login">
          <p >Login</p>
        </Link>

        <p style={{color:'red'}}>{errMessage}</p>
        </div>
    
    )
  
  }
})