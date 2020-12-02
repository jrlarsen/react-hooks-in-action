import {useState, useEffect, Fragment} from 'react';
import Spinner from "../UI/Spinner";
import getData from "../../utils/api"; // we'll use this api function

export default function UsersList () {
  // include state for an error object and an isLoading flag
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  const user = users?.[userIndex];

  // update the effect to use the getData function
  useEffect(() => {
    getData("http://localhost:3001/users")
      .then(data => {
        setUsers(data);
        setIsLoading(false); // the data has finished loading
      })
      .catch(error => {
        setError(error); // set the error object
        setIsLoading(false); // we're no longer loading
      });
  }, []);

  // alternative UI for when there's an error
  if (error) {
    return <p>{error.message}</p>
  }

  // alternative UI while users load
  if (isLoading) {
    return <p><Spinner/> Loading users...</p>
  }

  // this UI is unchanged
  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li
            key={u.id}
            className={i === userIndex ? "selected" : null}
          >
            <button
              className="btn"
              onClick={() => setUserIndex(i)}
            >
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}