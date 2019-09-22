import React ,{useState , useEffect }from 'react';
import './App.css';

function App() {

  const [user ,setUser] = useState({data : [] });

const kk = async () =>{
  const res = await fetch("/auth",{
  
   })

  const data= await res.json();
  setUser({data : data })


}

  useEffect(() => {
    kk();
  },[]);
  console.log(user)
  return (
    <div className="App">

   <h1>Users</h1>
   
   {user.data.map(users =>

    <li key= {users.username} >{users.username}</li>
   )}

  
    </div>
  );
}

export default App;
