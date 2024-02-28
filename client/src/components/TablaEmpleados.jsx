import editIcon from "../assets/Edit.svg"
import deleteIcon from "../assets/Delete.svg"
import MUIDataTable from "mui-datatables"
import {useQuery} from "react-query"
import {getUsers, deleteEmpleado} from "../api/userApi.js"
import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx"
function TablaEmpleados() {

  const context = useContext(AppContext)

  const { data, isLoading, isError } = useQuery('users', getUsers);
  if (isLoading) {
    return <div className="w-full h-screen text-white">Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los datos</div>;
  }
  const onDelete = async (row) => {
    console.log("Eliminar: "+row)
    await deleteEmpleado(row.uid);
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
      name: "username",
      label: "Nombre de usuario",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "rol",
      label: "Rol"
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
    textLabels: {
      body: {
        noMatch: "No se encontraron resultados",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por pagina:",
        displayRows: "de",
      },
    }
  }
  return (
    <MUIDataTable
      columns={columns}
      data={data.data}
      title="Empleados"
      options={options}
    />
    
  )
}

export default TablaEmpleados