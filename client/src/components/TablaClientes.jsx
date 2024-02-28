import editIcon from "../assets/Edit.svg"
import deleteIcon from "../assets/Delete.svg"
import MUIDataTable from "mui-datatables"
import {useQuery} from "react-query"
import {deleteCliente, getClientes} from "../api/clienteApi.js"
import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx"
function TablaClientes() {
    const { data, isLoading, isError } = useQuery('clientes', getClientes);

    const context = useContext(AppContext)
    if (isLoading) {
    return <div>Cargando...</div>;
    }

    if (isError) {
    return <div>Error al cargar los datos</div>;
    }
    const onDelete = async (row) => {
        await deleteCliente(row.uid);
        window.location.reload()
        
    }
    const onEdit = (row) => {
        context.setObject(row)
        context.setOpen(true)
    }
    const columns = [
    {
        name: "uid",
        label: "ID"
    },
    {
        name: "nombre",
        label: "Nombre del cliente",
    },
    {
        name: "domicilio",
        label: "Domicilio",
    },
    {
        name: "telefono",
        label: "Telefono"
    },
    {
        name: "tarjetaCredito",
        label: "Tarjeta de Credito",
    },
    {
        name: "nroTarjeta",
        label: "N° de Tarjeta de Credito",
    },
    {
        name: "nroCuentaBancario",
        label: "N° de Cuenta Bancaria",
    },
    {
        name: "codigoBancario",
        label: "Codigo Bancario",
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
        title= "Clientes"
        options={options}
        />
    )
}

export default TablaClientes