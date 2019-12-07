import React ,{useState} from 'react';
import {Link ,withRouter } from 'react-router-dom'
import "./../App.css"
import Dashboard from './Dashboard';
function Login(props){


  const [userData, setUserData] = useState({});
  const [errMessage, setErrMessage] = useState("");
  

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    //console.log("vijay")
  };

  const handleSubmit = async () => {

    if( !userData.username ||! userData.password ){

      setErrMessage("fill the details")
    }else{
    const userdata = {
     
      username : userData.username,
      password: userData.password
    };
 

    const response = await fetch('/auth/login' , {
    method: "POST",
    headers: {
      'Content-type': 'application/json'

    },
    mode:'cors',
    body :JSON.stringify(userdata)
  })
  const data = await response.json();
  console.log(data)
  if (data.success === true) {
   
    console.log(data.success)
     props.history.push("/dashboard");
    //return <Redirect to="/Dashboard" />
    
  }else{ setErrMessage(data.message) }

    }
  }
    return(
        
        <div className="App ">
        <h3>Welcome</h3>
        
        <table className="login"  onChange={handleChange} >
        <tr>
        <td><p>username  : </p></td><td><input type="text" name="username" /></td>
        </tr>
        <tr>
        <td><p>Password  : </p></td><td><input type="password" name="password" /></td>
        </tr>
       
        </table>
        
        <br />
        <input type="button" value="Login" name="login"  className="btn-success " onClick={handleSubmit}/>
            <br />
        <Link to="/register">
          <p >Register.</p>
        </Link>

        <p style={{color:'red'}}>{errMessage}</p>
        </div>
    )


}

export default withRouter( Login);