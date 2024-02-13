import { TbNotes } from "react-icons/tb";
import { BiPlusCircle } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { useAuthLogout } from '../services/auth.service.js';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Sidebar(props: any) {
  const sidebarStyle = {
    transform: !props.isSidebarOpen ? 'translateX(0)' : 'translateX(-17rem)',
    transition: 'transform 0.3s ease-in-out',
  };
  const sidebarStyleB = {
    transform: !props.isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.4s ease-in-out',
  };
  const { clientLogout, isLoading, success } = useAuthLogout();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!isLoading && success) {
      navigate('/login')
    }
  }, [isLoading, success]);
  
  return (
    <div style={sidebarStyleB} className="fixed w-full h-screen z-30">
    <div
      style={sidebarStyle}
      className="bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg h-full fixed top-0 left-0 w-[17rem] bg-gray-700 shadow-lg border-r-2 border-gray-600 z-40"
    >
      <div className="flex justify-center items-center mt-20">
        <input type="text" placeholder="Search" className="outline-none border-none ring-1 ring-gray-600 bg-transparent rounded-full py-2 px-4 mx-4 text-sm text-gray-400 transition-all duration-300 focus:ring-purple-400" />
      </div>
      <div className="mt-4">
        <h1 className="text-gray-400 text-sm mx-4">Actions</h1>
        <ul className="flex justify-center flex-col">
          <li onClick={() => props.isNoteClicked()} className="mx-3 px-2 py-3 text-gray-400 rounded-full mt-3 flex flex-row items-center transition-all duration-300 text-white bg-purple-500 hover:bg-purple-400"><BiPlusCircle className="mx-2 text-xl" /><p className="text-sm">New Note</p></li>
        </ul>
      </div>
      <div className="mt-4">
        <h1 className="text-gray-400 text-sm mx-4">Pages</h1>
        <ul className="flex justify-center flex-col">
          <li className="mx-3 bg-gray-600 px-2 py-3 text-gray-400  rounded-full mt-3 flex flex-row items-center transition-all duration-300 hover:text-white hover:bg-green-400"><TbNotes className="mx-2 text-xl" /><p className="text-sm">My Notes</p></li>
           <li className="mx-3 bg-gray-600 px-2 py-3 text-gray-400  rounded-full mt-3 flex flex-row items-center transition-all duration-300 hover:text-white hover:bg-green-400"><LuUser2 className="mx-2 text-xl" /><p className="text-sm">My Profile</p></li>
        </ul>
      </div>
      <div className="absolute bottom-[6rem] w-full">
        <li onClick={() => clientLogout()} className="mx-3 px-2 py-3 text-white rounded-full mt-3 flex flex-row items-center transition-all duration-300 bg-red-500 hover:bg-red-400 hover:text-white"><IoLogOutOutline className="mx-2 text-xl" /><p className="text-sm">{ isLoading ? 'Loading...' : 'Logout' }</p></li>
      </div>
    </div>
    </div>
  );
}
