import { TbNotes } from "react-icons/tb";
import { useCreateNote } from '../services/notes.service.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast.tsx';

export default function CreateNotes() {
  const { createNote, isLoading } = useCreateNote();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [title, setTitle] = useState("");
  
  const handleCreate = async () => {
    if(title) {
      const status = await createNote(title);
      if(status.code != 200) {
        setToast({ type: "alert-error", message: status.message })
        setTimeout(() => {
          setToast(null)
        }, 3000)
      } else if (status.code == 200) {
        setToast({ type: "alert-success", message: "Successfully created note." })
      setTimeout(() => {
        setToast(null)
        navigate('/note/' + status.nid)
      }, 2000)
      }
    } else {
      setToast({ type: "warn", message: "Missing title!" })
      setTimeout(() => {
        setToast(null)
      }, 3000)
    }
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  
  return (
    <dialog id="create-note" className="modal">
    
  <div className="modal-box bg-gray-700 bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg">
    <h3 className="font-bold text-lg text-white flex flex-row">New Note<TbNotes className="text-2xl ml-2" /></h3>
    <input value={title} onChange={handleChangeTitle} className="border-none outline-none py-3 px-4 text-white bg-gray-700 w-full rounded-lg mt-4 bg-opacity-50 backdrop-blur-xl" placeholder="Enter Name for your Note" />
    <div className="modal-action">
      <button onClick={handleCreate} className="btn border-none text-white bg-green-400">{ isLoading ? '...' : 'Create' }</button>
      <form method="dialog">
        <button className="btn bg-red-500 border-none text-white">Close</button>
      </form>
    </div>
  </div>
</dialog>
  )
}