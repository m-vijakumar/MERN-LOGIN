import React  from 'react'
import {Link } from 'react-router-dom'
import { useState } from 'react'
export default function Register() {


  const [userData, setUserData] = useState({});
  const [errMessage, setErrMessage] = useState("");

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    //console.log("vijay")
  };

  const handleSubmit = async () => {
    const userdata = {
      email: userData.email,
      username : userData.username,
      password: userData.password
    };
 

    const responess =  await fetch('/auth/register' , {
    method: "POST",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'

    },
    body :JSON.stringify(userdata)
  })
    .then((result) => {
      console.log(result)
      console.log(result.success)
      const data =  responess.json();
      console.log(data )
    })


  }
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
        <input type="button" name="register"  value="Register" className="btn-success , App" onClick={handleSubmit} />
        </table>
        
        <br />
        <Link to="/login">
          <p >Login</p>
        </Link>
        </div>
    
    )
}
