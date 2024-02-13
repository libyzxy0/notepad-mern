import Header from '../components/Header.tsx';
import { useAuthRegister } from '../services/auth.service.js';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { register, isLoading, success } = useAuthRegister();
  
  const handleChangeUsername = (event) => setUsername(event.target.value);

  const handleChangePassword = (event) => setPassword(event.target.value);
  
  const handleChangeEmail = (event) => setEmail(event.target.value);

  const handleSubmit = async () => {
    await register("test", email, username, password);
  };
  useEffect(() => {
    if(success) {
      navigate('/login');
    }
  }, [success]);
  return (
    <div className="flex flex-col items-center bg-gray-800 w-full h-screen overflow-hidden">
       <Header adjust="t" />
       <div className="flex flex-col items-center w-full mt-8">
       <div className="flex flex-col justify-center w-[80%] mt-5">
       <label className="text-gray-300 mb-1">Username</label>
       <input value={username} onChange={handleChangeUsername} type="text" className="outline-none border-none w-full py-3 bg-gray-700 ring-gray-700 ring-1 focus:ring-purple-400 px-4 rounded text-white" placeholder="Enter your username" />
       </div>
       <div className="flex flex-col justify-center w-[80%] mt-5">
       <label className="text-gray-300 mb-1">Email</label>
       <input value={email} onChange={handleChangeEmail} type="email" className="outline-none border-none w-full py-3 bg-gray-700 ring-gray-700 ring-1 focus:ring-purple-400 px-4 rounded text-white" placeholder="Enter your email" />
       </div>
       <div className="flex flex-col justify-center w-[80%] mt-5">
       <label className="text-gray-300 mb-1">Password</label>
       <input value={password} onChange={handleChangePassword} type="password" className="outline-none border-none w-full py-3 bg-gray-700 ring-gray-700 ring-1 focus:ring-purple-400 px-4 rounded text-white" placeholder="Enter your password" />
       <a href="#" className="text-emerald-400 my-3 text-sm inline p-0">Forgot Password?</a>
       <div className="flex flex-row">
          <input className="accent-purple-400" type="checkbox" />
          <p className="text-white my-3 text-xs inline p-0 ml-2">By checking, you confirm that you've read and agreed to our <a className="text-purple-400" href="#">Terms of Use</a> and <a className="text-purple-400" href="#">Privacy Policy</a>.</p>
       </div>
       </div>
       </div>
       <div className="mt-8 flex justify-center items-center w-full">
       <button onClick={() => handleSubmit()} className="outline-none border-none py-3 font-bold text-[17px] text-white bg-emerald-400 px-2 w-[80%] rounded-full shadow">{ isLoading ? 'Loading...' : 'Create my Account' }</button>
       </div>
       <div className="mt-8 text-center">
         <p className="text-white">Already have an account? <a href="login" className="text-emerald-400">Login</a></p>
       </div>
    </div>
  )
}