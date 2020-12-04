import Booking from "./Booking";

export default function BookingDetails ({booking, bookable}) {
  return (
    <div className="booking-details">
      <h2>Booking Details</h2>

      {booking ? (
        <Booking
          booking={booking}
          bookable={bookable}
        />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
}