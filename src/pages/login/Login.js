import React, { useState , } from 'react';
import './Login.scss';
import { Await, Link ,useNavigate } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';
import axios, { Axios } from 'axios';
import { storeUser } from '../../Helper/Helper';




function Login() {

   const initialUser={password:"", identifier:""}

   const [user, setUser] = useState(initialUser);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   



   
const handleChange= ({target})=>{
   const {name, value}=target
 setUser((currentUser)=>({
   ...currentUser,
  [name]:value,
}))
}
  
const handleLogin= async (e) =>{
   e.preventDefault();

 const url='http://localhost:1337/api/auth/local';
 try{
    if(user.identifier && user.password){
      const {data}= await axios.post(url, user)
     if(data.jwt){
      storeUser(data);
      setUser(initialUser)
     navigate('/') 
     }
    }
 } catch(error){
   console.log(error);
   setError(error.response ? error.response.data.message : 'Something went wrong');
 }
}



// }

  return (
    <div className="Login">
    <div className="login-box">
       <h2 className='heading'>Login</h2>
       <form   onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input type="email" 
          className='email'
          name='identifier'
          value={user.identifier}
           id="email" 
           onChange={handleChange}
           />

          <label htmlFor ="password">Password</label>
          <input type="password"
           className='password' 
           id="password" 
           value={user.password}
           name='password'
           onChange={handleChange}
           />

          <input type="submit" className='submit' />

       </form>
       <p className='subheading'>Do not have an account? <Link  className="link"to="/signup">Sign Up</Link> </p>
    </div>
 </div>
  )
}

export default Login