import {useMemo} from "react";
import {shortISO} from "../../utils/date-wrangler";
import useFetch from "../../utils/useFetch";
import {getGrid, transformBookings} from "./grid-builder";

export function useBookings (bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const queryString = `bookableId=${bookableId}` +
    `&date_gte=${start}&date_lte=${end}`;

  const query = useFetch(`${urlRoot}?${queryString}`);

  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query
  };
}

export function useGrid (bookable, startDate) {
  return useMemo(
    () => bookable ? getGrid(bookable, startDate) : {},
    [bookable, startDate]
  );
}