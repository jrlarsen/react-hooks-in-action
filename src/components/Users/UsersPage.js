import {useState} from "react"; // import useState
import UsersList from "./UsersList";
import UserDetails from "./UserDetails"; // import new component

export default function UsersPage () {
  // manage selected user state
  const [user, setUser] = useState(null);

  // pass user state down
  return (
    <main className="users-page">
      <UsersList user={user} setUser={setUser}/>
      <UserDetails user={user}/>
    </main>
  );
}