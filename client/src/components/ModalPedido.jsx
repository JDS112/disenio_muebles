import {useForm} from "react-hook-form"
import {addPedido} from "../api/pedidoApi.js"
import {useContext} from "react"
import { AppContext } from "../context/AppContext.jsx"
import {useQuery} from "react-query"
import {getClientes} from "../api/clienteApi.js"
import {getMuebles} from "../api/muebleApi.js"
function ModalPedido() {
    const {data: dataCliente} = useQuery('clientes', getClientes);
    const {data: dataMueble} = useQuery('muebles', getMuebles);
    const {register, handleSubmit,reset} = useForm()
    const context = useContext(AppContext)
    const today = new Date().toLocaleDateString('en-CA');

    const onSubmit = async data => {
        try {
            const muebleSeleccionado = dataMueble.data.find(
                (item) => item.uid == data.idMueble
            );

            const esLabrado = muebleSeleccionado.labrado
            console.log(esLabrado);
            const pedidoData = {
                ...data,
                labrado: esLabrado,
            }
            console.log(pedidoData)
            const res = await addPedido(pedidoData)
            console.log(res)
            context.setIsOpen(false)
            reset()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
            {
            context.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10 h-screen w-screen">
        <div className="relative bg-[rgb(30,31,34)] p-5 rounded-lg flex flex-col justify-center items-center gap-5 z-20 shadow-2xl">

            <h1 className="text-white text-2xl">Nuevo Pedido</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="flex flex-col text-white mr-5 w-72">
                        <label htmlFor="">ID del cliente</label>
                        <select name="" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("idCliente")}
                        
                        >
                            {
                                
                                dataCliente.data.map((item, index) =>(
                                    <option value={item.uid} key={index}>ID: {item.uid} Nombre: {item.nombre}</option>
                                ))
                                
                            }
                        </select>
                        <label htmlFor="">ID de mueble</label>
                        <select name="" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("idMueble")}
                        >
                            {
                                dataMueble.data.map((item, index) =>(
                                    <option value={item.uid} key={index}>ID: {item.uid} Descripcion: {item.descripcion} </option>
                                ))
                            }
                        </select>

                        <label htmlFor="">Cantidad</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("cantidad")}
                        />
                        <label htmlFor="">Fecha del pedido</label>
                        <input type="date" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        defaultValue={today}
                        {...register("fechaPedido")}
                        />
                    </div>
                    <div className="flex flex-col text-white w-72">
                        <label htmlFor="">Fecha de la entrega</label>
                        <input type="date" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("fechaEntrega")}
                        />
                        <label htmlFor="">Seña($)</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("seña")}
                        />
                        <label htmlFor="">Estado</label>
                        <select name="" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("estado")}
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Retirado">Retirado</option>
                        </select>
                    </div>
                </div>
                
                <div className="flex mt-4">
                    <button type="submit" className="p-4 bg-green-600 text-white rounded-xl w-full hover:scale-105 duration-300" >Añadir</button>
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

export default ModalPedido