import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/authLayout';
import { useNavigate, Link } from "react-router-dom";
import Input from '../../components/layouts/inputs/Input';
import { validateEmail } from '../../utils/helper';
import Protofilephotoselector from '../../components/layouts/inputs/Protofilephotoselector';


const Signup = () => {
  const[profilepic,setprofilepic]=useState(null);
  const[fullname,setfullname]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");

  const[error,seterror]=useState(null);

  const navigate=useNavigate();

  //handel sign up form submit

  const handelSignUp=async (e) =>{
    e.preventDefault();

    let profileImageurl="";

    if(!fullname){
      seterror("please enter your name!!");
      return;
    }
    if(!validateEmail(email)){
      seterror("please enter valid email address!!");
      return;
    }
    if(!password){
      seterror("please enter valid password!!");
      return;
    }
    seterror("");

    //signup API call
  }

  return (
    <AuthLayout>
     <div className='lg;w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
    <h3 className="text-xl font-semibold text-black">Create An Acoount!!</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6'>
      Join Us Today By entering Your Details Below..
    </p>

    <form onSubmit={handelSignUp}>
    
    <Protofilephotoselector image={profilepic} setimage={setprofilepic}/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input 
        value={fullname}
        onChange={({target})=>setfullname(target.value)}
        label="Full Name"
        placeholder='sri'
        type="text" />

          <Input 
            value={email} 
            onChange={({ target }) => setemail(target.value)} 
            label="Email Address"
            placeholder="abc@gmail.com" 
            type="text" 
          />
        <div className="col-span-2">
          <Input 
            value={password} 
            onChange={({ target }) => setpassword(target.value)} 
            label="Password"
            placeholder="Min 8 characters" 
            type="password" 
          />
          </div>
      </div>
      
                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                  <button type="submit" className='btn-primary'>SIGNUP</button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                     Already Have An Account?!{" "}
                    <Link className='font-medium text-primary underline' to="/login">
                      Login
                    </Link>
                  </p>
        </form>
    </div>
      </AuthLayout>
  );
};

export default Signup