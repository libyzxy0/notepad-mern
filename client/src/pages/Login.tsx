import Header from '../components/Header.tsx';
import { useAuthLogin } from '../services/auth.service.js';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Toast from '../components/Toast.tsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const { login, isLoading } = useAuthLogin();
  
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if(!username) {
      setToast({ type: "warn", message: "Missing username!" })
      setTimeout(() => {
        setToast(null)
      }, 3000)
      return;
    } else if (!password) {
      setToast({ type: "warn", message: "Missing password!" })
      setTimeout(() => {
        setToast(null)
      }, 3000)
      return;
    }
    const status = await login("test", username, password);
    if(status.code != 200) {
      setToast({ type: "alert-error", message: status.message })
      setTimeout(() => {
        setToast(null)
      }, 3000)
    } else if(status.code == 200) {
      setToast({ type: "alert-success", message: "Successfully logged in." })
      setTimeout(() => {
        setToast(null)
        navigate('/')
      }, 3000)
    }
  };
  
  return (
    <div className="flex flex-col items-center bg-gray-800 w-full h-screen overflow-hidden">
       <Header />
       {toast && (
        <Toast message={toast?.message} type={toast?.type} />
       )}
       <div className="flex flex-col items-center w-full mt-8">
       
       <div className="flex flex-col justify-center w-[80%] mt-5">
       <label className="text-gray-300 mb-1">Username</label>
       <input value={username} onChange={handleChangeUsername} type="text" className="outline-none border-none w-full py-3 bg-gray-700 ring-gray-700 ring-1 focus:ring-purple-400 px-4 rounded text-white" placeholder="Enter your username" />
       </div>
       <div className="flex flex-col justify-center w-[80%] mt-5">
       <label className="text-gray-300 mb-1">Password</label>
       <input value={password} onChange={handleChangePassword} type="password" className="outline-none border-none w-full py-3 bg-gray-700 ring-gray-700 ring-1 focus:ring-purple-400 px-4 rounded text-white" placeholder="Enter your password" />
       <a href="#" className="text-emerald-400 my-3 text-sm inline p-0">Forgot Password?</a>
       </div>
       </div>
       <div className="mt-5 flex justify-center items-center w-full">
       <button onClick={handleSubmit} className="outline-none border-none py-3 font-bold text-[17px] text-white bg-emerald-400 px-2 w-[80%] rounded-full shadow">{ isLoading ? 'Loading...' : 'Login' }</button>
       </div>
       <div className="mt-8 text-center">
         <p className="text-white">Don't have an account? <a href="signup" className="text-emerald-400">Create One</a></p>
       </div>
    </div>
  )
}