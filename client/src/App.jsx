import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RecepcionistaPage from "./pages/RecepcionistaPage"
import HomePage from "./pages/admin/HomePage"
import MueblesPage from "./pages/admin/MueblesPage"
import EmpleadosPage from "./pages/admin/EmpleadosPage"
import ClientePage from "./pages/admin/ClientePage"
import PedidoPage from "./pages/admin/PedidoPage"
import JefePage from "./pages/JefePage"
import CarpinteroPage from "./pages/CarpinteroPage"
import AppContextProvider from "./context/AppContext"
function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element ={<LoginPage/>}/>
          <Route path = "/recepcionista" element={<RecepcionistaPage/>}/>
          <Route path = "/jefe" element={<JefePage/>}/>
          <Route path = "/carpintero" element={<CarpinteroPage/>}/>
          <Route path="/admin/inicio" element={<HomePage/>}/>
          <Route path="/admin/mueble" element={<MueblesPage/>}/>
          <Route path="/admin/empleado" element={<EmpleadosPage/>}/>
          <Route path="/admin/cliente" element={<ClientePage/>}/>
          <Route path="/admin/pedido" element={<PedidoPage/>}/>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
    
  )
}

export default App