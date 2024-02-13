import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useLongPress from '../utils/longpress.js';

export default function NoteCard(props: any) {
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setShouldRender(true);
  }, []);
  
  const handleClick = () => {
    navigate('/note/' + props.nid)
  }
  
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const onLongPress = () => {
     props.onLongPress(props.nid)
  };
  const longPressEvent = useLongPress(onLongPress, handleClick, defaultOptions);
  return (
    <div
      className={`transition-opacity duration-700 ${
        shouldRender ? 'opacity-100' : 'opacity-0'
      }`}
    >
    <button {...longPressEvent} className="bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg bg-gray-700 py-3 w-full rounded-lg mb-4">
      <h1 className="text-left mx-4 text-green-400 text-2xl font-bold mt-2">{ props.title }</h1>
      <p className="text-gray-400 text-left text-md mx-4 my-1">{ props.ct && props.ct.length > 60 ? `${props.ct.slice(0, 60)}...` : props.ct
      }</p>
      <p className="text-gray-500 text-right mx-4 text-sm">{ props.date }</p>
    </button>
    </div>
  )
}