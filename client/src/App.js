import React ,{useState , useEffect }from 'react';
import './App.css';

function App() {

  const [user ,setUser] = useState({data : "" });

const kk =() =>{
  fetch("/.js",{
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
   })
  .then(res => res.json() )
  .then(u =>  setUser({data : u }))

}

  useEffect(() => {
    kk();
  },[]);
  console.log(user)
  return (
    <div className="App">

   <h1>Users</h1>
   
   {user.data.username}
    </div>
  );
}

export default App;
