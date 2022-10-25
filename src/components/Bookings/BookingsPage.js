import {useQuery} from "react-query"; // import useQuery

import {shortISO} from "../../utils/date-wrangler";
import {useBookingsParams} from "./bookingsHooks";
import getData from "../../utils/api"; // import data-fetching function

import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";
import PageSpinner from "../UI/PageSpinner";

export default function BookingsPage () {
  // switch from useFetch to useQuery
  const {data: bookables = [], status, error} = useQuery(
    "bookables",
    () => getData("http://localhost:3009/bookables")
  );

  const {date, bookableId} = useBookingsParams();

  const bookable = bookables.find(
    b => b.id === bookableId
  ) || bookables[0];

  function getUrl (id) {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  }

  if (status === "error") {
    return <p>{error.message}</p>
  }

  if (status === "loading") {
    return <PageSpinner/>
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