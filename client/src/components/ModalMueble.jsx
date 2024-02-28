import {useForm} from "react-hook-form"
import {addMueble} from "../api/muebleApi.js"
import {useContext} from "react"
import { AppContext } from "../context/AppContext.jsx"
function ModalMueble() {
    const {register, handleSubmit, setValue,reset} = useForm()
    const appContext = useContext(AppContext)
    const onSubmit = async data => {
        try {
            const res = await addMueble(data)
            console.log(res)
            appContext.setIsOpen(false)
            reset()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSelectChangeLabrado = event=>{
        setValue("labrado", event.target.value);
    }
  return (
    <>
            {
            appContext.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10 h-screen w-screen">
        <div className="relative bg-[rgb(30,31,34)] p-5 rounded-lg flex flex-col justify-center items-center gap-5 z-20 shadow-2xl">

            <h1 className="text-white text-2xl">Nuevo Mueble</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="flex flex-col text-white mr-5 w-72">
                        <label htmlFor="">Descripcion</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("descripcion")}
                        />
                        <label htmlFor="">Tamaño Sugerido</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("tamañoSugerido")}
                        />
                    </div>
                    <div className="flex flex-col text-white w-72">
                        <label htmlFor="">Labrado</label>
                        <select id="" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("labrado")}
                        onChange={handleSelectChangeLabrado}
                        >
                            <option value="No">No</option>
                            <option value="Si">Si</option>
                        </select>
                        <label htmlFor="">Precio</label>
                        <input type="text" className="p-4 rounded-lg bg-[rgb(43,45,49)] outline-none focus:scale-105 duration-300"
                        {...register("precio")}
                        />
                    </div>
                </div>
                
                <div className="flex mt-4">
                    <button type="submit" className="p-4 bg-green-600 text-white rounded-xl w-full hover:scale-105 duration-300" >Añadir</button>
                </div>
            </form>
            <button className="text-white absolute top-0 right-4 text-4xl hover:bg-red-600 rounded-b-lg duration-300 p-1" onClick={()=> appContext.setIsOpen(false)} >x</button>
        </div>
    </div>
                
            )
        }
        </>
  )
}

export default ModalMueble