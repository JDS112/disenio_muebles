import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import {Link} from "react-router-dom"
import iconUser from "../assets/User.png"
import PedidosCarpintero from "../components/PedidosCarpintero"
function CarpinteroPage() {
    const [open, setOpen] = useState(false)
    const [userData, setUserData] = useState(null)
    useEffect(()=>{
    const userDataString = Cookies.get('dataUser');
    if (userDataString) {
      const userDataFromCookie = JSON.parse(userDataString);
      setUserData(userDataFromCookie);
    }
  },[])
  console.log(userData)
  return (
    <div className="bg-[rgb(43,45,49)] w-screen h-screen relative">
        <div className="">
            <nav className="w-screen bg-[rgb(30,31,34)] text-white p-2 flex justify-between items-center shadow-xl relative">
            <h1 className=" text-white text-2xl text-center my-2 w-full">Pedidos a Realizar</h1>
            <button className="p-2 hover:bg-[rgb(43,45,49)] rounded-lg duration-300" onClick={()=> setOpen(!open)}>
              <img src={iconUser} className="h-10" />
            </button>
            {
              open && (
                <div className="absolute right-0 top-full bg-[rgb(49,51,56)] p-4 text-white rounded-md shadow-lg">
                  <div className="w-full border-b-2 border-gray-400">
                    <h1 className="p-2 rounded-md w-full"><span className="font-bold">Nombre: </span>{userData.username}</h1>
                    <p className="p-2 text-gray-200"><span className="font-bold">Email: </span>{userData.email}</p>
                    <p className="p-2 text-gray-200"><span className="font-bold">Rol: </span>{userData.rol}</p>
                  </div>
                  <Link to= "/">
                    <button className="p-2 mt-2 w-full hover:bg-red-600 rounded-lg duration-300 hover:scale-95">Cerrar sesion</button>
                  </Link>
                </div>
              )
            }
            </nav>
        </div>
        <PedidosCarpintero carpintero= {userData}/>
    </div>
  )
}

export default CarpinteroPage