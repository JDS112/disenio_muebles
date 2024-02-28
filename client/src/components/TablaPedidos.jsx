import editIcon from "../assets/Edit.svg"
import deleteIcon from "../assets/Delete.svg"
import MUIDataTable from "mui-datatables"
import {useQuery} from "react-query"
import {getPedidos, deletePedido} from "../api/pedidoApi.js"
import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx"
function TablaPedidos() {
    const { data, isLoading, isError } = useQuery('pedidos', getPedidos);
    const context = useContext(AppContext)
    if (isLoading) {
    return <div>Cargando...</div>;
    }

    if (isError) {
    return <div>Error al cargar los datos</div>;
    }

    const onDelete = async (row) => {
        await deletePedido(row.nroPedido);
        window.location.reload()
        
    }
    const onEdit = (row) => {
        context.setObject(row)
        context.setOpen(true)
    }
    const columns = [
    {
        name: "nroPedido",
        label: "ID"
    },
    {
        name: "idCliente",
        label: "ID de Cliente",
    },
    {
        name: "idMueble",
        label: "ID de Mueble",
    },
    {
        name: "cantidad",
        label: "Cantidad"
    },
    {
        name: "fechaPedido",
        label: "Fecha del Pedido",
    },
    {
        name: "fechaEntrega",
        label: "Fecha de la Entrega",
    },
    {
        name: "seña",
        label: "Seña",
    },
    {
        name: "estado",
        label: "Estado",
    },
    {
        name: "carpintero",
        label: "Carpintero",
    },
    {
        name: "acciones",
        label: "Acciones",
        options: {
            customBodyRenderLite: (dataIndex) => {
            let row = data.data[dataIndex]
                return (
                    <div className="flex">
                        <button className="flex p-2 bg-blue-600 rounded-xl text-white justify-center" onClick={() => onEdit(row)}><img src={editIcon} className="w-5"/> Editar</button>
                        <button className="flex p-2 bg-red-600 rounded-xl text-white justify-center" onClick={() => onDelete(row)}><img src={deleteIcon} className="w-5"/> Eliminar</button>
                    </div>
                )  
            },
        }
    }
    ]
    const options = {
    selectableRows: "none",
    }
  return (
    <MUIDataTable
    columns={columns}
    data={data.data}
    title= "Pedidos"
    options={options}
    />
  )
}

export default TablaPedidos