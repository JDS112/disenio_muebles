import {getPedidos} from "../api/pedidoApi.js"
import {useQuery} from "react-query"
import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx";
import ModalAsignarCarpintero from "./ModalAsignarCarpintero.jsx";
import { useState } from "react";
function ListaPedidos() {
    const context = useContext(AppContext)
    const { data, isLoading, isError } = useQuery('pedidos', getPedidos);
    const [idPedido, setIdPedido] = useState(null)
    const [labrado, setLabrado] = useState(null)
    if (isLoading) {
        return <div>Cargando...</div>;
        }
    
        if (isError) {
        return <div>Error al cargar los datos</div>;
        }

        const handleAsignarCarpintero = (pedidoId, labrado) => {
            setIdPedido(pedidoId);
            setLabrado(labrado)
            context.setIsOpen(true);
          };
        const pedidosPendientes = data.data.filter(pedido => pedido.estado ==="Pendiente")
        if (pedidosPendientes.length === 0){
            return <div className="text-gray-300">No hay pedidos pendientes</div>
        }
  return (
    <div className="">
    <div className="p-6 w-screen h-full justify-center grid grid-cols-3 gap-6">        
        {
            pedidosPendientes.map((pedido, index) => (
                <div className="bg-[rgb(30,31,34)] p-5 rounded-md text-white hover:scale-105 duration-500 hover:shadow-2xl" key={index}>
                    <div className="flex justify-between">
                        <h1 className="font-bold text-lg">Nro de Pedido: {pedido.nroPedido}</h1>
                        <h1 className="font-bold text-lg">{pedido.estado}</h1>
                    </div>

                    <hr className="py-2"/>
                    <h2>ID Cliente: {pedido.idCliente}</h2>
                    <h2>ID Mueble: {pedido.idMueble}</h2>
                    <h2>Cantidad: {pedido.cantidad}</h2>
                    <h2>Seña: {pedido.seña}$</h2>
                    <h2>Mueble Labrado: {pedido.labrado}</h2>
                    <h2>Fecha que se realizo el pedido: {pedido.fechaPedido}</h2>
                    <h2>Fecha de entrega: {pedido.fechaEntrega}</h2>
                    <button className="p-3 mt-2 bg-[rgb(88,101,242)] rounded-lg w-full hover:scale-105 duration-200 hover:bg-[rgb(63,72,164)] hover:text-gray-300"
                    onClick={()=> handleAsignarCarpintero(pedido.nroPedido, pedido.labrado)}>Asignar Carpintero</button>
                </div>
            ))
        }
        <ModalAsignarCarpintero id={idPedido} labrado={labrado}/>
    </div>
    </div>
  )
}

export default ListaPedidos