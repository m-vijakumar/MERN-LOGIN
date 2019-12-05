import React ,{useState} from 'react';
import {Link } from 'react-router-dom'
import "./../App.css"
function Login(){


    const [userData, setUserData] = useState({});
    const [errMessage, setErrMessage] = useState("");
  
    const handleChange = e => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
      const userdata = {
        email: userData.email,
        password: userData.password
      };
    };

    onsubmit= (e) =>{
        fetch('http://localhost:5000/users/register' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      }
      .then((result) => {
        console.log(result)
      })
  })

    }
    return(
        
        <div className="App ">
        <h3>Welcome</h3>
        
        <table className="login">
        <tr>
        <td><p>username  : </p></td><td><input type="text" name="username" /></td>
        </tr>
        <tr>
        <td><p>Password  : </p></td><td><input type="password" name="password" /></td>
        </tr>
       
        </table>
        
        <br />
        <input type="submit" value="Login" name="login"  className="btn-success "/>
            <br />
        <Link to="/register">
          <p >Register.</p>
        </Link>
        </div>
    )


}

export default Login;