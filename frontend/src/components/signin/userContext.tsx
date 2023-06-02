import { Dispatch, createContext, useEffect, useState } from "react";

interface UserContextData {
    userId: string,
    username: string,
    token: string,
}

interface UserContextValue {
    user?: UserContextData,
    setUser?: Dispatch<UserContextData>
}

const defaultValue: UserContextValue = {};

const UserContext = createContext(defaultValue);

function UserContextProvider({ children }: { children: JSX.Element[] }) {
    const stateDefVal: UserContextData = {
        userId: "",
        username: "",
        token: ""
    };
    
    useEffect(() => {
        
    }, []);

    const [user, setUser] = useState(stateDefVal);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}

export { UserContext as default, UserContextProvider };
export type { UserContextData };

