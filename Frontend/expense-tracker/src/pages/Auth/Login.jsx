import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import Input from '../../components/Layout/Inputs/Input'; 
import { validateEmail } from '../../utils/helper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if(!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if(!password) {
      setError('Password cannot be empty.');
      return;
    }
    setError(''); 

    //Login API call

  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login!
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@ex.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 8 characters"
          />
        

          <button
            type="submit"
            className="w-50 mt-4 items-center ml-50 bg-violet-600 text-white px-4 py-2 rounded transition-all duration-200 hover:bg-violet-100 hover:text-violet-700 font-semibold shadow-sm hover:shadow-md justify-center"
          >
            Login
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{' '}
            <Link className='font-medium text-purple-600 underline' to="/signup">
              SignUp
            </Link></p>
        </form>
       </div>
    </AuthLayout>
  );
};

export default Login;
