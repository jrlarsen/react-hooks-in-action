import React from "react";

export default function BookingsGrid (props) {
  const {week, bookable, booking, setBooking} = props;

  return (
    <div className="bookings-grid placeholder">
      <h3>Bookings Grid</h3>
      <p>{bookable?.title}</p>
      <p>{week.date.toISOString()}</p>
    </div>
  );
}