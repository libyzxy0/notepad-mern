import { FaChevronLeft } from "react-icons/fa6";
import { MdOutlineSave } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function NoteHeader({ name, onSave }) {
  
  return (
    <header className="bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg fixed top-0 h-12 bg-gray-700 w-full justify-between flex items-center shadow border-b-2 border-gray-600 z-20">
      <div className="flex items-center h-full flex-row ml-3 w-auto">
        <Link to="/" className="text-gray-200 font-extrabold transition-all duration-300 hover:text-green-400"><FaChevronLeft className="text-xl" /></Link>
        <p className="text-white text-lg ml-2 font-thin flex flex-row">{ name.slice(0, 10) + `${name.length < 10 ? '' : '...' }` }</p>
      </div>
      <p className="text-green-400">Notepad <b className="text-purple-500">Online</b></p>
      <button onClick={() => onSave()} className="text-2xl text-gray-200 mx-4 transition-all duration-300 hover:text-green-400">
        <MdOutlineSave />
      </button>
    </header>
  )
}