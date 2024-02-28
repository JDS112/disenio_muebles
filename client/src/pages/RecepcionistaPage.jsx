import { useState } from "react";
import iconUser from "../assets/User.png"
import iconPedido from "../assets/Pedidos.svg"
import { AppContext } from "../context/AppContext";
import { useContext , useEffect} from "react";
import ModalPedido from "../components/ModalPedido"
import ModalCliente from "../components/ModalCliente"
import Cookies from "js-cookie"
function RecepcionistaPage() {
  const context = useContext(AppContext)
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
    <div className="bg-[rgb(43,45,49)] h-screen w-screen">
      <div>
        <nav className="w-screen bg-[rgb(30,31,34)] flex justify-end rounded-b-xl">
          <div className="flex items-center">
            <button className="p-2 rounded-lg flex items-center text-white hover:bg-green-600 duration-300 mr-2" onClick={()=> context.setIsOpen(true)}>
              <img src={iconPedido} className="h-10" />
              Añadir Pedido
            </button>
            <button className="p-2 rounded-lg flex items-center text-white hover:bg-green-600 duration-300 mr-[40vw]" onClick={()=> context.setOpen(true)}>
              <img src={iconPedido} className="h-10" />
              Añadir Cliente
            </button>
          </div>
          <div className="flex justify-end ">
            <button className="p-2 m-2 hover:bg-gray-950 rounded-lg duration-300" onClick={()=> setOpen(!open)}>
              <img src={iconUser} className="h-10" />
            </button>
            {
              open && (
                <div className="absolute right-0 top-[9vh] bg-gray-800 p-4 text-white">
                  <div className="w-full border-b-2 border-gray-400">
                    <h1 className="p-2 font-bold text-lg">{userData.username}</h1>
                    <p className="p-2 text-gray-200">{userData.email}</p>
                    <p className="p-2 text-gray-200">Rol: {userData.rol}</p>
                  </div>
                  
                  <button className="p-2 mt-2 w-full hover:bg-red-600 rounded-lg duration-300 hover:scale-95">Cerrar sesion</button>
                </div>
              )
            }
          </div>
        </nav>
      </div>
      <ModalPedido/>
      <ModalCliente/>
    </div>
  );
}

export default RecepcionistaPage;
