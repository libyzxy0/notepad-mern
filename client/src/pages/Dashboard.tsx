import Navbar from '../components/Navbar.tsx';
import Sidebar from '../components/Sidebar.tsx';
import RecentNoteCard from '../components/RecentNoteCard.tsx';
import NoteCard from '../components/NoteCard.tsx';
import { IoFilterOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useAuth } from '../services/auth.service.js';
import { useNavigate } from "react-router-dom";
import Loading from '../components/PageLoad.tsx'
import CreateNote from '../components/CreateNotes.tsx'
import { useReadAllNotes } from '../services/notes.service.js';

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  const { readAllNotes, isLoading: isLoadingNotes, notes } = useReadAllNotes();
  
  
  const toggleSidebar = (): void => {
    setSidebarOpen(!isSidebarOpen);
  };
  const fetchNotes = async () => {
    await readAllNotes();
  }
  
  useEffect(() => {
    if(!isLoading && !isAuthenticated) {
      navigate('/login')
    } else if (!isLoading && isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated, isLoading]);
  
  const toggleCreate = () => {
    const createNoteDialog = document.getElementById('create-note') as HTMLDialogElement;
    createNoteDialog.showModal();
  }

  
  function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
}
  
  const handleLongPress = (nid) => {
    //Handle long press on card
  }
  
  if(isLoading) return <Loading />
  
  return (
    <>
    <CreateNote />
    <div className="w-auto h-screen bg-gray-800">
       <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
       <Sidebar isNoteClicked={toggleCreate} isSidebarOpen={isSidebarOpen}/>
       <div className="pt-20 w-full h-auto">
       <div className="flex flex-row overflow-x-scroll scrollbar-hide mx-3 mb-5">
         <button onClick={toggleCreate} className="btn border-none px-3 py-2.5 bg-emerald-400 shadow-lg rounded text-white flex-shrink-0 mx-2">Create New</button>
         <button className="btn bg-transparent px-3 py-2.5 border-2 border-gray-600 shadow-lg rounded text-white flex-shrink-0 mx-2 flex flex-row justify-center items-center">Filter <IoFilterOutline className="ml-2"/></button>
       </div>
       <h1 className="mx-5 font-bold text-xl text-emerald-400">Recent Notes</h1>
       <div className="flex mx-3 mt-2 h-auto overflow-x-scroll scrollbar-hide">
       <RecentNoteCard title={user.username} description="Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eli" />
       <RecentNoteCard title="Lorem Ipsum" description="Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing eliLorem ipsum dolor sit amet, consectetur adipisicing eli" />
       </div>
       <h1 className="mx-5 mt-6 font-bold text-xl text-emerald-400">My Notes</h1>
       <div className="flex flex-col w-full flex-start">
          <div className="flex flex-col justify-center md:justify-start mx-4 md:mx-3 my-3 md:flex-row md:flex-wrap">
          
         {!isLoadingNotes && notes && (
           notes.map((item, index) => (
            <NoteCard onLongPress={handleLongPress} key={index} title={item.title} date={formatDate(item.editedAt)} ct={item.content} nid={item.nid} />
           ))
          )}
          </div>
       </div>
    </div>
    </div>
    </>
  )
}