import {Fragment} from "react";
import Spinner from "../UI/Spinner";

import {useBookings, useGrid} from "./bookingsHooks";

export default function BookingsGrid (
  {week, bookable, booking, setBooking}
) {
  const {bookings, status, error} = useBookings(
    bookable?.id, week.start, week.end
  );

  const {grid, sessions, dates} = useGrid(bookable, week.start);

  function cell (session, date) {
    const cellData = bookings?.[session]?.[date]
      || grid[session][date];

    const isSelected = booking?.session === session
      && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : null}
        onClick={
          status === "success"
            ? () => setBooking(cellData)
            : null
        }
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Waiting for bookable and week details...</p>
  }

  return (
    <Fragment>
      {status === "error" && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table
        className={
          status === "success"
            ? "bookingsGrid active"
            : "bookingsGrid"
        }
      >
        <thead>
        <tr>
          <th>
            <span className="status">
              <Spinner/>
            </span>
          </th>
          {dates.map(d => (
            <th key={d}>
              {(new Date(d)).toDateString()}
            </th>
          ))}
        </tr>
        </thead>

        <tbody>
        {sessions.map(session => (
          <tr key={session}>
            <th>{session}</th>
            {dates.map(date => cell(session, date))}
          </tr>
        ))}
        </tbody>
      </table>
    </Fragment>
  )
}