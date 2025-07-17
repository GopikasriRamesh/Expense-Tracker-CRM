import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import Input from '../../components/Layout/Inputs/Input'; 
import { validateEmail } from '../../utils/helper';
import Profileselector from '../../components/Layout/Inputs/Profileselector';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    const [profilePic, setprofilePic] = useState(null);
    const [fullName, setFullName] = useState('');

    //handle signup
    const handleSignUp = (e) => {
        e.preventDefault();

        let profilePicUrl = '';
        
        if(!fullName) {
            setError('Full name cannot be empty.');
            return;
        }
        if(!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if(!password) {
            setError('Password cannot be empty.');
            return;
        }
        
        setError(''); 

        //Signup API call

    };

  return (
    <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full flex flex-col justify-center mt-10 md:mt-0'>
         <h3 className='text-xl font-semibold text-black'>Create an account </h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join our community and start tracking your expenses</p>

        <form onSubmit={handleSignUp}>
            

            <Profileselector image={profilePic} setImage={setprofilePic} />
         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
         <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

             <Input
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />

            <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abcd@ex.com"
          />
          <div className='col-span-2'>
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
          />
           </div>
</div>
     <button
            type="submit"
            className=" w-50 mt-4 items-center ml-75 bg-violet-600 text-white px-4 py-2 rounded transition-all duration-200 hover:bg-violet-100 hover:text-violet-700 font-semibold shadow-sm hover:shadow-md justify-center"

          >
            signup
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{' '}
            <Link className='font-medium text-purple-600 underline' to="/login">
                Login
            </Link></p>
        </form>
            </div>
    </AuthLayout>
  )
}

export default SignUp