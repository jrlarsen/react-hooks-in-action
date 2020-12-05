import {useContext} from "react";
import {FaEdit} from "react-icons/fa";
import Booking from "./Booking";
import UserContext from "../Users/UserContext";

export default function BookingDetails ({booking, bookable}) {
  const user = useContext(UserContext);
  const isBooker = booking && user && (booking.bookerId === user.id);

  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button
              className="btn"
            >
              <FaEdit/>
            </button>
          </span>
        )}
      </h2>

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