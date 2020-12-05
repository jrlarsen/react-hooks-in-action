import {useState, useContext} from "react";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";

import UserContext from "./UserContext";

export default function UsersPage () {
  const [user, setUser] = useState(null);

  // the value from context is now an object,
  // so use destructuring to assign the user
  // context property to the loggedInUser variable
  const {user: loggedInUser} = useContext(UserContext);

  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser}/>
      <UserDetails user={currentUser}/>
    </main>
  );
}