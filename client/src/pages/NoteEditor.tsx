import { useParams } from 'react-router-dom';
import NoteHeader from '../components/NoteHeader.tsx';
import { FaRegBookmark } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../services/auth.service.js';
import { useNavigate } from "react-router-dom";
import Loading from '../components/PageLoad.tsx'
import { useReadNote, useUpdateNote } from '../services/notes.service.js';
import Toast from '../components/Toast.tsx';

export default function NoteEditor() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [toast, setToast] = useState(null);
  const [title, setTitle] = useState("");
  const { isAuthenticated, isLoading, user } = useAuth();
  const { readNote, isLoading: isLoadingNote } = useReadNote();
  const { updateNote, isLoading: isLoadingUpdateNote } = useUpdateNote();
  const showToast = (type, msg) => {
    setToast({ type, message: msg })
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }
  const contentEditableDiv = useRef(null);
  
  //Set the caret into last character.
  useEffect(() => {
    if (contentEditableDiv.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentEditableDiv.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [content]);
  
  const onInputChange = (e) => setContent(e.currentTarget.textContent);
  
  const handleUpdate = async () => {
    let status = await updateNote(id, content);
    if(status.code == 200) {
      showToast('alert-success', status.message)
    } else {
      showToast('alert-error', status.message)
    }
  }
  
  const fetchNote =  async () => {
    let status = await readNote(id);
    if(status.code == 200) {
      setContent(status.note.content);
      setTitle(status.note.title)
    } else {
      showToast('alert-error', status.message)
    }
  }
  
  useEffect(() => {
    if(!isLoading) {
      fetchNote();
    }
  }, [isLoading]);
  
  useEffect(() => {
    if(!isLoading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, isLoading]);
  
  useEffect(() => {
    const saveAfterDelay = setTimeout(handleUpdate, 2000);
    return () => clearTimeout(saveAfterDelay);
  }, [content]);

  
  const addTags = () => {}
  
  if(isLoading) return <Loading />
  
  return (
    <>
      <div className="w-full bg-gray-800 pb-10">
       {toast && (
        <Toast message={toast?.message} type={toast?.type} />
       )}
        <NoteHeader name={!title ? "Loading Title" : title } onSave={handleUpdate} />
        <div className="pt-16 bg-transparent text-gray-400 mx-3 flex justify-between items-center">
          <button onClick={addTags} className="select-none flex flex-row items-center transition-all duration-300 hover:text-purple-500">
            <FaRegBookmark className="text-xl" />
            <p className="mx-1 text-md">Add tags</p>
          </button>
          <p className="text-sm mx-2 mt-[2px]">11 Feb 2024, 1:40 PM</p>
        </div>
        
        
        <div onInput={onInputChange} contentEditable={true} ref={contentEditableDiv} className="resize-none h-auto w-full bg-gray-800 text-white outline-none border-none px-3 font-medium text-gray-100 cursor-text caret-green-400 pt-4">{content}</div>
        </div>
        
        
    </>
  )
}