import {useQuery} from "react-query";
import getData from "../../utils/api";

export default function UsersList ({user, setUser}) {
  const {data: users = []} = useQuery(
    "users",
    () => getData("http://localhost:3001/users"),
    {
      suspense: true  // enable suspense mode
    }
  );

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