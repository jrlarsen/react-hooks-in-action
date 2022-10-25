import {useEffect} from "react";
import {useQuery} from "react-query"; // import useQuery
import getData from "../../utils/api"; // import data-fetcher
import Spinner from "../UI/Spinner";
import {useUser} from "./UserContext";

export default function UserPicker () {
  const [user, setUser] = useUser();

  // switch from useFetch to useQuery
  const {data: users = [], status} = useQuery(
    "users",
    () => getData("http://localhost:3009/users")
  );

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect (e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find(u => u.id === selectedID);
    setUser(selectedUser);
  }

  if (status === "loading") {
    return <Spinner/>
  }

  if (status === "error") {
    return <span>Error!</span>
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