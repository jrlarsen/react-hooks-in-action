export default function UserDetails ({user}) {
  return user ? (
    <div className="item user">
      <div className="item-header">
        <h2>{user.name}</h2>
      </div>

      <div className="user-details">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>
    </div>
  ) : null;
}