import {
  useState,
  unstable_useTransition as useTransition,
  Suspense
} from "react";

import UsersList from "./UsersList";
import {useUser} from "./UserContext";
import PageSpinner from "../UI/PageSpinner";
import UserDetails from "./UserDetails";

import {useQueryClient} from "react-query";
import getData from "../../utils/api";

export default function UsersPage () {
  const [loggedInUser] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;
  const queryClient = useQueryClient();

  const [startTransition, isPending] = useTransition();

  function switchUser (nextUser) {
    startTransition(() => setSelectedUser(nextUser));

    queryClient.prefetchQuery(
      ["user", nextUser.id],
      () => getData(`http://localhost:3001/users/${nextUser.id}`)
    );

    queryClient.prefetchQuery(
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
      <UsersList user={user} setUser={switchUser}/>

      <Suspense fallback={<PageSpinner/>}>
        <UserDetails userID={user.id} isPending={isPending}/>
      </Suspense>
    </main>
  ) : <PageSpinner/>;
}