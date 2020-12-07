import {createContext, useContext, useState} from "react";

const UserContext = createContext();
const UserSetContext = createContext();

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

export function useUser () {

  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  if (!setUser) {
    throw new Error("The UserProvider is missing.");
  }

  return [user, setUser];
}