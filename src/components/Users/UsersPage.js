import {
  useState,
  unstable_useDeferredValue as useDeferredValue,
  Suspense
} from "react";
import {queryCache} from "react-query";
import getData from "../../utils/api";
import UsersList from "./UsersList";
import {useUser} from "./UserContext";
import PageSpinner from "../UI/PageSpinner";
import UserDetails from "./UserDetails";

export default function UsersPage () {
  const [loggedInUser] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;

  const deferredUser = useDeferredValue(user) || user;

  const isPending = deferredUser !== user;

  function switchUser (nextUser) {
    setSelectedUser(nextUser);

    queryCache.prefetchQuery(
      ["user", nextUser.id],
      () => getData(`http://localhost:3001/users/${nextUser.id}`)
    );

    queryCache.prefetchQuery(
      `http://localhost:3001/img/${nextUser.img}`,
      () => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = `http://localhost:3001/img/${nextUser.img}`;
      })
    );
  }

  return user ? (
    <main className="users-page">
      <UsersList
        user={user}
        setUser={switchUser}
        isPending={isPending}
      />

      <Suspense fallback={<PageSpinner/>}>
        <UserDetails
          userID={deferredUser.id}
          isPending={isPending}
        />
      </Suspense>
    </main>
  ) : <PageSpinner/>;
}