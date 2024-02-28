import {getMuebles, deleteMueble} from "../api/muebleApi.js"
import {useQuery} from "react-query"
import editIcon from "../assets/Edit.svg"
import deleteIcon from "../assets/Delete.svg"
import MUIDataTable from "mui-datatables"
import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx"
function TablaMuebles() {
  const { data, isLoading, isError } = useQuery('muebles', getMuebles);
  const context = useContext(AppContext)
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los datos</div>;
  }

  const onDelete = async (row) => {
    console.log("Eliminar: "+row)
    await deleteMueble(row.uid);
    window.location.reload();
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
        name: "descripcion",
        label: "Descripcion",
      },
      {
        name: "tamañoSugerido",
        label: "Tamaño Sugerido",
      },
      {
        name: "labrado",
        label: "Labrado"
      },
      {
        name: "precio",
        label: "Precio",
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
  ];

  const options = {
    selectableRows: "none",
  }
  return (
    <MUIDataTable
    columns={columns}
    data={data.data}
    options={options}
    title= "Muebles"
    />
  );
}

export default TablaMuebles 