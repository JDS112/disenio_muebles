import {useQuery} from "react-query"
import { getPedidos,updatePedido} from "../api/pedidoApi"
import { updateEmpleado } from "../api/userApi";
function PedidosCarpintero({carpintero}) {
    const { data, isLoading, isError } = useQuery('pedidos', getPedidos);
    if (isLoading) {
        return <div>Cargando...</div>;
    }
    
    if (isError) {
        return <div>Error al cargar los datos</div>;
    }
    const pedidoCarpintero = data.data.filter(pedido=> pedido.carpintero == carpintero?.uid && pedido.estado ==="En Proceso")
    if(pedidoCarpintero.length  === 0) {
        return <div className="text-gray-300 text-2xl text-center my-[40vh] animate-pulse">Sin pedidos asignados :)</div>
    }
  return (
    <div className="w-screen grid grid-cols-3 gap-2  p-6">
        {
            pedidoCarpintero.map((pedido, index)=> (
                <div>
                    <div className="bg-[rgb(30,31,34)] p-5 rounded-md text-white shadow-lg hover:scale-105 duration-500 hover:shadow-2xl" key={index}>
                    <div className="flex justify-between">
                        <h1 className="font-bold text-lg">Nro de Pedido: {pedido.nroPedido}</h1>
                        <h1 className="font-bold text-lg">{pedido.estado}</h1>
                    </div>

                    <hr className="py-2"/>
                    <h2>ID Cliente: {pedido.idCliente}</h2>
                    <h2>ID Mueble: {pedido.idMueble}</h2>
                    <h2>Cantidad: {pedido.cantidad}</h2>
                    <h2>Seña: {pedido.seña}$</h2>
                    <h2>Fecha que se realizo el pedido: {pedido.fechaPedido}</h2>
                    <h2>Fecha de entrega: {pedido.fechaEntrega}</h2>
                    <button className="p-3 mt-2 bg-[rgb(88,101,242)] rounded-lg w-full hover:scale-105 duration-200 hover:bg-[rgb(63,72,164)]"
                    onClick={async() => {
                        try {
                            const update = {
                                estado: "Finalizado",
                            }
                            const res = await updatePedido(pedido.nroPedido, update)
                            const updateCarpintero = {
                                estado: "Disponible",
                            }
                            console.log(res)
                            const r = await updateEmpleado(carpintero.uid, updateCarpintero)
                            console.log(r)
                            window.location.reload()
                        } catch (error) {
                            console.log(error)
                        }
                    }}>Terminado</button>
                </div>
                </div>
            ))
        }
    </div>
  )
}

export default PedidosCarpintero