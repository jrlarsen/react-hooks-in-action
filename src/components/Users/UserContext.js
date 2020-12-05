import {createContext, useState} from "react";

const UserContext = createContext();
export default UserContext;

export const UserSetContext = createContext();

export function UserProvider ({children}) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
      {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}
