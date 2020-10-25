import {useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import {useQuery, useMutation, queryCache} from "react-query";

import {shortISO, isDate} from "../../utils/date-wrangler";
import getData, {createItem, editItem, deleteItem} from "../../utils/api";
import {getGrid, transformBookings} from "./grid-builder";

export function useBookings (bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const queryString = `bookableId=${bookableId}` +
    `&date_gte=${start}&date_lte=${end}`;

  const query = useQuery(
    ["bookings", bookableId, start, end],
    () => getData(`${urlRoot}?${queryString}`)
  );

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

export function useBookingsParams () {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchDate = searchParams.get("date");
  const bookableId = searchParams.get("bookableId");

  const date = isDate(searchDate)
    ? new Date(searchDate)
    : new Date();

  const idInt = parseInt(bookableId);
  const hasId = !isNaN(idInt);

  function setBookingsDate(date) {
    const params = {};

    if (hasId) {params.bookableId = bookableId}
    if (isDate(date)) {params.date = date}

    if (params.date || params.bookableId !== undefined) {
      setSearchParams(params, {replace: true});
    }
  }

  return {
    date,
    bookableId: hasId ? idInt : undefined,
    setBookingsDate
  };
}

export function useCreateBooking (key) {
  return useMutation(
    item => createItem("http://localhost:3001/bookings", item),
    {
      onSuccess: (booking) => {
        queryCache.invalidateQueries(key);
        const bookings = queryCache.getQueryData(key) || [];
        queryCache.setQueryData(key, [...bookings, booking]);
      }
    }
  );
}

export function useUpdateBooking (key) {
  return useMutation(
    item => editItem(`http://localhost:3001/bookings/${item.id}`, item),
    {
      onSuccess: (booking) => {
        queryCache.invalidateQueries(key);
        const bookings = queryCache.getQueryData(key) || [];
        const bookingIndex = bookings.findIndex(b => b.id === booking.id);
        bookings[bookingIndex] = booking;
        queryCache.setQueryData(key, bookings);
      }
    }
  );
}

export function useDeleteBooking (key) {
  return useMutation(
    id => deleteItem(`http://localhost:3001/bookings/${id}`),
    {
      onSuccess: (resp, id) => {
        queryCache.invalidateQueries(key);
        const bookings = queryCache.getQueryData(key) || [];
        queryCache.setQueryData(key, bookings.filter(b => b.id !== id))
      }
    }
  )
}