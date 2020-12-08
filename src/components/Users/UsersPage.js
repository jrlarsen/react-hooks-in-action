import {useState} from "react";
import UsersList from "./UsersList";
import UserDetails from "./UserDetails";
import {useUser} from "./UserContext"; // import custom hook

export default function UsersPage () {
  const [user, setUser] = useState(null);
  const [loggedInUser] = useUser(); // use custom hook
  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser}/>
      <UserDetails user={currentUser}/>
    </main>
  );
}