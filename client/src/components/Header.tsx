export default function Header(props: any) {
  return (
    <div className="flex flex-col justify-center items-center">
    <h1 className={`text-emerald-400 text-4xl font-bold ${props.adjust ? 'mt-14' : 'mt-24'}`}>Notepad <b className="text-purple-400">Online</b></h1>
       <p className="text-white mt-3">Securely save your important notes.</p>
    </div>
  )
}