import {useForm} from "react-hook-form"
import {addCliente} from "../api/clienteApi.js"
import {useContext} from "react"
import { AppContext } from "../context/AppContext.jsx"
function ModalCliente() {
  const {register, handleSubmit,reset} = useForm()
    const appContext = useContext(AppContext)
    const onSubmit = async data => {
        try {
            const res = await addCliente(data)
            console.log(data)
            console.log(res)
            appContext.setIsOpen(false)
            window.location.reload()
            reset()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
            {
            appContext.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10 h-screen w-screen">
        <div className="relative bg-[rgb(30,31,34)] p-5 rounded-lg flex flex-col justify-center items-center gap-5 z-20 shadow-2xl">

            <h1 className="text-white text-2xl">Nuevo Cliente</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="flex flex-col text-white mr-5 w-72">
                        <label htmlFor="">Nombre</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("nombre")}
                        />
                        <label htmlFor="">Domicilio</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("domicilio")}
                        />

                        <label htmlFor="">Telefono</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("telefono")}
                        />
                        <label htmlFor="">Terjeta de credito</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("tarjetaCredito")}
                        />
                    </div>
                    <div className="flex flex-col text-white w-72">
                        <label htmlFor="">Nro de Tarjeta</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("nroTarjeta")}
                        />
                        <label htmlFor="">Nro de Cuenta Bancario</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("nroCuentaBancario")}
                        />
                        <label htmlFor="">Codigo Bancario</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("codigoBancario")}
                        />
                    </div>
                </div>
                
                <div className="flex mt-4">
                    <button type="submit" className="p-4 bg-green-600 text-white rounded-xl w-full hover:scale-105 duration-300" >Añadir</button>
                </div>
            </form>
            <button className="text-white absolute top-0 right-4 text-4xl hover:bg-red-600 rounded-b-lg duration-300 p-1" onClick={()=> appContext.setOpen(false)} >x</button>
        </div>
    </div>
                
            )
        }
        </>
  )
}

export default ModalCliente