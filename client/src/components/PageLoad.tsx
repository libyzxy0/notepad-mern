import ReactLoading from 'react-loading';
export default function PageLoad() {
  return (
    <div className="text-white grid place-items-center font-bold h-screen">
      <ReactLoading type="spinningBubbles" color="white" height={50} width={50} />
    </div>
  )
}