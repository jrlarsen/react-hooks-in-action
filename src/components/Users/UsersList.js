import {useQuery} from "react-query"; // import useQuery
import getData from "../../utils/api"; // import data-fetcher
import Spinner from "../UI/Spinner";

export default function UsersList ({user, setUser}) {

  // switch from useFetch to useQuery
  const {data: users = [], status, error} = useQuery(
    "users",
    () => getData("http://localhost:3009/users")
  );

  if (status === "error") {
    return <p>{error.message}</p>
  }

  if (status === "loading") {
    return <p><Spinner/> Loading users...</p>
  }

  return (
    <ul className="users items-list-nav">
      {users.map(u => (
        <li
          key={u.id}
          className={u.id === user?.id ? "selected" : null}
        >
          <button
            className="btn"
            onClick={() => setUser(u)}
          >
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}