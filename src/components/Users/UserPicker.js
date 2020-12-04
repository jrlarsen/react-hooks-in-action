import {useEffect, useState} from "react";
import Spinner from "../UI/Spinner";

export default function UserPicker ({user, setUser}) {
  const [users, setUsers] = useState(null);

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