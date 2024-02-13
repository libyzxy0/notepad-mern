export default function Toast(props) {
  return (
   <div className="toast toast-end">
     <div className={`alert border-none text-white ${props.type == 'warn' ? 'bg-yellow-500' : props.type }`}>
       <span>{ props.message }</span>
     </div>
  </div>
  )
}