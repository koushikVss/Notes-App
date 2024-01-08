"use client"
import { createContext, useState } from "react"


export const AppContext = createContext()

const AppProvider = ({ children }) => {
    
    const [user, setUser] = useState(undefined)

    return (
        <AppContext.Provider value={{user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;



