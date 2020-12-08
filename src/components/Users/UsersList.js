import {useQuery} from "react-query";
import getData from "../../utils/api";
import ButtonPending from "../UI/ButtonPending";

export default function UsersList ({user, setUser}) {
  const {data: users = []} = useQuery(
    "users",
    () => getData("http://localhost:3001/users"),
    {suspense: true}
  );

  return (
    <ul className="users items-list-nav">
      {users.map(u => (
        <li
          key={u.id}
          className={u.id === user?.id ? "selected" : null}
        >
          <ButtonPending
            className="btn"
            onClick={() => setUser(u)}
          >
            {u.name}
          </ButtonPending>
        </li>
      ))}
    </ul>
  );
}