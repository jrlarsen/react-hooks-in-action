import {useState, useContext} from "react";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";

import UserContext from "./UserContext"; // import the shared context

export default function UsersPage () {
  const [user, setUser] = useState(null);

  // get the user from context
  const loggedInUser = useContext(UserContext);

  // if no user has been selected in the users list,
  // select the logged in user
  const currentUser = user || loggedInUser;

  // pass currentUser to children
  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser}/>
      <UserDetails user={currentUser}/>
    </main>
  );
}