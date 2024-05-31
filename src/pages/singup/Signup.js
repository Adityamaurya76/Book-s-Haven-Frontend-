import React, { useState } from 'react';
import './Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import {axiosClient} from '../../utils/axiosClient';
import axios from 'axios';


function Signup() {
  const initialize={email:"", password:"", username:""};
  const[user, setUser]=useState(initialize);
  const [data, setData] = useState(null);
  const navigate=useNavigate();

 

   const register = async (e) => {
    e.preventDefault();
    const url='http://localhost:1337/api/auth/local/register';
     try{
        if(user.username && user.email && user.password){
         const response = await axios.post(url, user);
         console.log(response);
        if(response){
          setUser(initialize);
          navigate('/login');
        }  


        }
     } catch (error){
         console.log(error);
     }
  }

  const handleUserChange =({target}) =>{
   const {name, value} =target;
   setUser((currentUser) =>({
    ...currentUser,
    [name]: value,
   }))
  }

  return (
    <div className="Signup">
    <div className="Signup-box">
       <h2 className='heading'>SignUp</h2>
           <form  onSubmit={register} >
           <label htmlFor="text">Name</label>
            <input type="text" className='name' name='username' id ="name" value={user.username} onChange={handleUserChange} />
 
 
            <label htmlFor="email">Email</label>
            <input type="email" className='email' name='email' id ="email"  value={user.email} onChange={handleUserChange}/>
 
            <label htmlFor="password">Password</label>
            <input type="password" className='password' name='password' id ="password" value={user.password} onChange={handleUserChange} />
 
            <input type="submit" className='submit' />
            
           </form>
           <p className='subheading'>already have an account? <Link className='link' to="/login">Login</Link> </p>
       </div>
    </div>
  )
}

export default Signup;