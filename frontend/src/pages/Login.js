import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from './utils';
import 'react-toastify/dist/ReactToastify.css'

function Login() {
   
  const [loginInfo, setloginInfo] = useState({
    email:'',
    password:''
  });

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setloginInfo({...loginInfo,[name]: value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const { email, password} = loginInfo;

    if(!email || !password){
      handleError('All fields are required');
      return;
    }

   try{
    const url = "http://localhost:5000/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(loginInfo)
    });

    const result = await response.json();
    const {success, message, jwtToken, name, error} = result;

    if(success){
      handleSuccess(message);

      localStorage.setItem('token', jwtToken);
      localStorage.setItem('loggedInUser', name);

      // 🔥 IMPORTANT FIX
      setTimeout(()=>{
        window.location.href = "/";
      },1000);

    }else if(error){
      const details = error?.details[0].message;
      handleError(details);
    }else{
      handleError(message);
    }

  }catch (err){
      handleError(err);
    }
   }
  
  return (
  <>
  <style>
   {`
      body{
      margin: 0;
      font-family: Arial, sans-serif;
      }

      .signup-container{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #6a11cb, #2575fc);
      }

      .signup-box{
      background: rgba(14, 13, 13, 0.45);
      padding:30px;
      border-radius: 15px;
      backdrop-filter: blur(12px);
      width:350px;
      text-align: center;
      box-shadow: 0px 8px 30px rgba(0,0,0,0.5);   
      }

      .signup-box h2{
      color: white;
      text-align: left;
      margin-bottom: 10px;
      }

      .input-group label{
      color: white;
      font-size: 14px;
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      }

      .input-group{
      text-align: left;
      margin-bottom: 10px;
      }

      .input-group input{
      width: 100%;
      padding: 10px;
      background: #f3f2eb;
      border: none;
      border-radius: 8px;
      margin-top:10px;
      box-sizing: border-box;
      }

     .signup-box form{
     width: 100%;
     }

      .signup-box button{
      width: 100%;
      padding: 10px;
      background: #ffd700;
      border: none;
      border-radius: 8px;
      margin-top: 10px;
      cursor: pointer;
      }

      .signup-box p{
      color: white;
      }
     
      .signup-box a{
      color: white;
      text-decoration: underline;
      }
   `}
  </style>
 
    <div className='signup-container'>
      <div className='signup-box'>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} noValidate>
       
         <div className='input-group'>
            <label>Email</label>
            <input 
              onChange={handleChange}
              type='email'
              name='email'
              value={loginInfo.email}
              placeholder='Enter Your email'
            />
         </div>

         <div className='input-group'>
            <label>Password</label>
            <input 
              onChange={handleChange}
              type='password'
              name='password'
              value={loginInfo.password}
              placeholder='Enter Your Password'
            />
         </div>

         <button type='submit'>Login</button>

         <p>Don't have an account?
            <Link to="/signup"> SignUp</Link>
         </p>

      </form>
      
      </div>
      <ToastContainer/>
    </div>
  </>
  )
}

export default Login;