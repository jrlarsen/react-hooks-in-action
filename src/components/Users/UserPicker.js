import {useContext, useEffect, useState} from "react";
import Spinner from "../UI/Spinner";

// import contexts for the user value and updater function
import UserContext from "./UserContext";
import {UserSetContext} from "./UserContext";

export default function UserPicker () {
  const [users, setUsers] = useState(null);

  // get values from both contexts
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => {
        setUsers(data);
        setUser(data[0]);
      });
  }, [setUser]);

  function handleSelect (e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find(u => u.id === selectedID);

    setUser(selectedUser);
  }

  if (users === null) {
    return <Spinner/>
  }

  return (
    <select
      className="user-picker"
      onChange={handleSelect}
      value={user?.id}
    >
      {users.map(u => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </select>
  );
}