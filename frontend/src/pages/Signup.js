import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from './utils';
import 'react-toastify/dist/ReactToastify.css'
function Signup() {
   
  const [signupInfo, setsignupInfo] = useState({
    name: '',
    email:'',
    password:''
  })

  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    setsignupInfo({...signupInfo,[name]: value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if(!name || !email || !password){
      handleError('All fields are required');
      return;
    }
   try{
    const url = "http://localhost:5000/auth/signup";
    const response = await fetch(url, {
      method: "POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(signupInfo)
    });

    const result = await response.json();
    const {success, message, error} = result;
    if(success){
      handleSuccess(message);
      setTimeout(()=>{
      navigate('/login')
      },1000)
    }else if(error){
      const details = error?.details[0].message;
      handleError(details);
    }else if(!success){
      handleError(message);
    }
    console.log(result);
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
      font-family: Arial, sanserif;
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
      margin-bottom: 10px
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
      margin-top: 10px
      }

      .signup-box p{
      color: white;
      }
     
      .signup-box a{
      color: white}
   `}
  </style>
 
    <div className='signup-container'>
      <div className='signup-box'>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}
      noValidate>
       <div className='input-group'>
        <label htmlFor='name'>Name</label>
        <input 
        onChange={handleChange}
        type='text'
        name='name'
        value={signupInfo.name}
        autoFocus
        placeholder='Enter Your Name'
        />
       </div>
         <div className='input-group'>
        <label htmlFor='email'>Email</label>
        <input 
        onChange={handleChange}
        type='email'
        name='email'
        value={signupInfo.email}
        placeholder='Enter Your email'
        
        />
       </div>
         <div className='input-group'>
        <label htmlFor='password'>Password</label>
        <input 
        onChange={handleChange}
        type='password'
        name='password'
        value={signupInfo.password}
        placeholder='Enter Your Password'
      
        />
       </div>
       <button type='submit'>Signup</button>
       <p>Already have an account?
        <a href='/login'>Login</a>
       </p>
      </form>
      
      </div>
      <ToastContainer/>
    </div>
     </>
  )
}

export default Signup;
