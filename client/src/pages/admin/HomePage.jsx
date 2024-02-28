import NavBar from "../../components/NavBar"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import {Link} from "react-router-dom"
import iconUser from "../../assets/User.png"
function HomePage() {
    const [open, setOpen] = useState(false)
    const [userData, setUserData] = useState(null)
    useEffect(()=>{
    const userDataString = Cookies.get('dataUser');
    if (userDataString) {
      const userDataFromCookie = JSON.parse(userDataString);
      setUserData(userDataFromCookie);
    }
  },[])
  return (
    <div className="flex flex-row">
      <div className="">
        <NavBar/>
      </div>
      <div className="bg-[rgb(43,45,49)] w-screen h-screen">
        <div className="">
            <nav className="w-full bg-[rgb(30,31,34)] text-white p-2 flex justify-between items-center shadow-xl relative">
            <h1 className=" text-white text-2xl text-center my-2 w-full animate-pulse">Inicio</h1>
            <button className="p-2 hover:bg-[rgb(43,45,49)] rounded-lg duration-300 hover:scale-105" onClick={()=> setOpen(!open)}>
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
        <div className="w-full my-[40vh] text-zinc-300 flex flex-col items-center">
            <h1 className="text-3xl">Proyecto Diseño de muebles</h1>
            <hr className="w-[20vw] my-2" />
            <h2 className="text-xl">Proyecto desarrollado por: John Soliz</h2>
        </div>
      </div>
    </div>
  )
}

export default HomePage