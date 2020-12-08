import {useQuery} from "react-query";

import {shortISO} from "../../utils/date-wrangler";
import {useBookingsParams} from "./bookingsHooks";
import getData from "../../utils/api";

import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";

export default function BookingsPage () {
  const {data: bookables = []} = useQuery(
    "bookables",
    () => getData("http://localhost:3001/bookables"),
    {
      suspense: true // enable suspense mode
    }
  );

  const {date, bookableId} = useBookingsParams();

  const bookable = bookables.find(
    b => b.id === bookableId
  ) || bookables[0];

  function getUrl (id) {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  }

  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings
        bookable={bookable}
      />
    </main>
  );
}