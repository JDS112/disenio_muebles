import {useForm} from "react-hook-form"
import {getClientes} from "../api/clienteApi.js"
import {getMuebles} from "../api/muebleApi.js"
import {updatePedido} from "../api/pedidoApi.js"
import { useContext, useEffect} from "react"
import { useQuery } from "react-query"
import { AppContext } from "../context/AppContext.jsx"
function ModalPedidoEdit() {
    const {data: dataCliente} = useQuery('clientes', getClientes);
    const {data: dataMueble} = useQuery('muebles', getMuebles);
    const {register, handleSubmit, setValue,reset} = useForm()
    const context = useContext(AppContext)
    const onSubmit = async data => {
        try {
            const res = await updatePedido(context.object.nroPedido,data)
            console.log(data)
            console.log(res)
            context.setOpen(false)
            reset()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectChange = (event) => {
        setValue("estado", event.target.value);
    };

    useEffect(() => {
        Object.keys(context.object).forEach((key) => {
            setValue(key, context.object[key]);
        });
    }, [context.object,setValue]);
  return (
    <>
            {
            context.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10 h-screen w-screen">
        <div className="relative bg-[rgb(30,31,34)] p-5 rounded-lg flex flex-col justify-center items-center gap-5 z-20 shadow-2xl">

            <h1 className="text-white text-2xl">Actualizar Pedido</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="flex flex-col text-white mr-5 w-72">
                        <label htmlFor="">ID del cliente</label>
                        <select name="" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("idCliente")}
                        onChange={handleSelectChange}
                        >
                            {
                                
                                dataCliente.data.map((item, index) =>(
                                    <option value={item.uid} key={index}>{item.uid}</option>
                                ))
                                
                            }
                        </select>
                        <label htmlFor="">ID de mueble</label>
                        <select name="" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("idMueble")}
                        onChange={handleSelectChange}
                        >
                            {
                                dataMueble.data.map((item, index) =>(
                                    <option value={item.uid} key={index}>{item.uid}</option>
                                ))
                            }
                        </select>

                        <label htmlFor="">Cantidad</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("cantidad")}
                        />
                        <label htmlFor="">Fecha del pedido</label>
                        <input type="date" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
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
                        onChange={handleSelectChange}
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Retirado">Retirado</option>
                        </select>
                    </div>
                </div>
                
                <div className="flex mt-4">
                    <button type="submit" className="p-4 bg-green-600 text-white rounded-xl w-full hover:scale-105 duration-300" >Guardar</button>
                </div>
            </form>
            <button className="text-white absolute top-0 right-4 text-4xl hover:bg-red-600 rounded-b-lg duration-300 p-1" onClick={()=> context.setOpen(false)} >x</button>
        </div>
    </div>
                
            )
        }
        </>
  )
}

export default ModalPedidoEdit