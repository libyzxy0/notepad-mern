import { useState, useEffect } from 'react';
export default function RecentNoteCard(props: any) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);
  return (
    <div
      className={`transition-opacity duration-700 ${
        shouldRender ? 'opacity-100' : 'opacity-0'
      }`}
    >
    <div className="bg-opacity-50 backdrop-blur-xl rounded drop-shadow-lg select-none flex-shrink-0 max-w-[15rem] bg-gray-700 shadow-md rounded mx-2 border-[1.5px] border-purple-400">
        <h1 className="text-purple-400 text-[18px] pt-2 px-3">{ props.title }</h1>
        <p className="px-3 pb-3 text-white text-sm font-medium truncate text-ellipsis">{ props.description }</p>
    </div>
    </div>
  )
}