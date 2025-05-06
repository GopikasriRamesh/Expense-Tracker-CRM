import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authLayout';
import { useNavigate, Link } from "react-router-dom";
import Input from '../../components/layouts/inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apipaths';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpasword] = useState("");
  const [error, seterror] = useState(null);

  const navigate=useNavigate();
//handel Login submit
  const handelLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      seterror("enter valid email address!!");
      return;
    }
    if(!password){
      seterror("enter valid password")
      return;
    }

    seterror("");

    //Login API call
    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        navigate("/Client/src/pages/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        seterror(error.response.data.message);
      }else{
        seterror("something went wrong.please try again!!");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center px-6 pt-12">
        <h3 className='text-xl font-semibold text-black mb-2'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your login details!!
        </p>    
        <form onSubmit={handelLogin}>
          <Input 
            value={email} 
            onChange={({ target }) => setemail(target.value)} 
            label="Email Address"
            placeholder="abc@gmail.com" 
            type="text" 
          />
          <Input 
            value={password} 
            onChange={({ target }) => setpasword(target.value)} 
            label="Password"
            placeholder="Min 8 characters" 
            type="password" 
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type="submit" className='btn-primary'>LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?!{" "}
            <Link className='font-medium text-primary underline' to="/signup">
              Sign Up
            </Link>
          </p>
        </form>  
      </div>
    </AuthLayout>
  );
};

export default Login;
