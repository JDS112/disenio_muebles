import {getUsers, updateEmpleado} from "../api/userApi.js"
import {updatePedido} from "../api/pedidoApi.js"
import {useQuery} from "react-query"
import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx"
import {useForm} from "react-hook-form"
function ModalAsignarCarpintero({id, labrado}) {
  const {data} = useQuery('users',getUsers);
  const {register, handleSubmit,reset} = useForm()
  const context = useContext(AppContext)

  const onSubmit = async data => {
    try {
        const UpdateData = {
          carpintero: data.carpintero,
          estado: "En Proceso"

        }
        const res = await updatePedido(id, UpdateData)
        console.log(res)
        const updateCarpintero = {
          estado: "Ocupado"
        }
        const carpintero = await updateEmpleado(data.carpintero, updateCarpintero)
        console.log(carpintero)
        context.setIsOpen(false)
        reset()
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
  }
  const carpinteros = data?.data?.filter((user) => {
    if (labrado === "Si") {
      return user.rol === "carpinteroLabrado" && user.estado ==="Disponible";
    } else {
      return user.rol === "carpintero" && user.estado === "Disponible";
    }
  });

  return (
    <>
            {
            context.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10 h-screen w-screen">
        <div className="relative bg-[rgb(30,31,34)] p-5 rounded-lg flex flex-col justify-center items-center gap-5 z-20 shadow-2xl">

            <h1 className="text-white text-2xl">Asignar Carpintero</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col text-white w-72">
                        <label htmlFor="">Carpintero</label>
                        <select name="" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("carpintero")}
                        >
                            {
                              carpinteros.map((carpintero, index)=> (
                                <option value={carpintero.uid}>{carpintero.username} {carpintero.rol}</option>
                              ))
                            }
                        </select>
                    </div>
                
                <div className="flex mt-4">
                    <button type="submit" className="p-4 bg-green-600 text-white rounded-xl w-full hover:scale-105 duration-300" >Asignar</button>
                </div>
            </form>
            <button className="text-white absolute top-0 right-4 text-4xl hover:bg-red-600 rounded-b-lg duration-300 p-1" onClick={()=> context.setIsOpen(false)} >x</button>
        </div>
    </div>
                
            )
        }
        </>
  )
}

export default ModalAsignarCarpintero