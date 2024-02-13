import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar(props: any) {
  return (
    <div className="bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg flex flex-row items-center fixed top-0 w-full bg-gray-700 shadow h-14 z-40">
      <button onClick={props.toggleSidebar} className="text-white text-2xl mx-4 md:hidden">{
!props.isSidebarOpen ? <IoCloseOutline /> : <HiBars3CenterLeft />}
      </button>
      <h1 className="font-bold text-[21px] text-emerald-400 py-3 md:mx-4">Notepad <b className="text-purple-400">Online</b></h1>
    </div>
  )
}