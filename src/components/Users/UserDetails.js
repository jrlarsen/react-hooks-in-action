import {useQuery} from "react-query";
import getData from '../../utils/api';

export default function UserDetails ({userID}) {
  const {data: user} = useQuery(
    ["user", userID],
    () => getData(`http://localhost:3001/users/${userID}`),
    {suspense: true}
  );

  return (
    <div className="item user">
      <div className="item-header">
        <h2>{user.name}</h2>
      </div>

      <div className="user-avatar">
        <img src={`http://localhost:3001/img/${user.img}`} alt={user.name}/>
      </div>

      <div className="user-details">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>
    </div>
  )
}