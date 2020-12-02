import {useState, useEffect} from 'react';
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

export default function UsersList ({user, setUser}) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then(data => {
        setUser(data[0]); // set initial user to first (or undefined)
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [setUser]); // pass in dependency

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p><Spinner/> Loading users...</p>
  }

  // user user.id to match selection.
  // remove the UI for user details
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