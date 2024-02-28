import {useState, createContext} from "react"

export const  AppContext = createContext();
export default function AppContextProvider({children}){
    const [isOpen, setIsOpen ] = useState(false)
    const [open, setOpen] = useState(false)
    const [object, setObject] = useState({})
    const [user, setUser] = useState({})
    return (
        <AppContext.Provider value={{isOpen, setIsOpen, object, setObject, open , setOpen, user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}