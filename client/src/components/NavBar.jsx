import icon from "../assets/Home.svg"
import {Link} from "react-router-dom"
function NavBar() {

  const options = [
    {titulo: "Inicio", icon: "Home.svg" ,route: "/inicio"},
    {titulo: "Muebles", icon: "Muebles.svg", route: "/mueble"},
    {titulo: "Empleados", icon: "Empleados.svg", route: "/empleado"},
    {titulo: "Clientes", icon: "Clientes.svg" , route: "/cliente"},
    {titulo: "Pedidos", icon: "Pedidos.svg", route: "/pedido"},,
  ]
  return (
    <div className="p-4 flex flex-col overflow-y-auto overflow-x-hidden h-screen bg-[rgb(30,31,34)] justify-center">
      {
        options.map((item , index) => (
          <Link to={`/admin${item.route}`}>
            <div className="group mb-4" key={index}>
              <button className="h-16 w-16 bg-[rgb(43,45,49)] rounded-[50%] group-hover:rounded-3xl group-hover:bg-[rgb(35,165,89)] group-hover:translate-x-3 transition-all flex justify-center items-center duration-300">
                <img src={`../src/assets/${item.icon}`} className="w-10 group-hover:rotate-12 duration-700"/>
                <span className="absolute top-full mt-1 hidden group-hover:block text-white bg-slate-800 p-1 rounded-lg z-50">{item.titulo}</span>
              </button>
            </div>
          </Link>
        )
      )}
    </div>
  )
}

export default NavBar