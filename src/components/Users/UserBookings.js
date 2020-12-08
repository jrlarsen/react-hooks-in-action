import {Suspense} from "react";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function UserBookings ({id}) {
  const {data: bookings} = useQuery(
    ["userbookings", id],
    () => getData(
      `http://localhost:3001/bookings?bookerId=${id}&_sort=date`,
      3000
    ),
    {suspense: true}
  );

  return (
    <div className="user-bookings">
      <Suspense fallback={<p>Loading user bookings...</p>}>
        <BookingsTable bookings={bookings}/>
      </Suspense>
    </div>
  );
}

function BookingsTable ({bookings}) {
  return bookings.length > 0 ? (
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Session</th>
        <th>Bookable</th>
      </tr>
      </thead>
      <tbody>
      {bookings.map(b => <BookingRow booking={b} key={b.id}/>)}
      </tbody>
    </table>
  ) : (
    <p>There are no bookings for this user.</p>
  )
}

function BookingRow ({booking: {id, date, session, title, bookableId}}) {
  const {data: bookable, isFetching, isError} = useQuery(
    ["bookable", bookableId],
    () => getData(`http://localhost:3001/bookables/${bookableId}`)
  );

  return (
    <tr key={id} className={isFetching ? "fetching" : null}>
      <td>
        <Link to={`/bookings?bookableId=${bookableId}&date=${date}`}>
          {title}
        </Link>
      </td>
      <td>{(new Date(date)).toDateString()}</td>
      <td>{session}</td>
      <td>{bookable
        ? bookable.title
        : isError
          ? "???"
          : <Spinner/>}</td>
    </tr>
  );
}