import {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";

import {useUser} from "../Users/UserContext";
import {useBookingsParams, useCreateBooking, useDeleteBooking, useUpdateBooking} from "./bookingsHooks";
import {getWeek, shortISO} from "../../utils/date-wrangler";

import Booking from "./Booking";
import BookingForm from "./BookingForm";

export default function BookingDetails ({booking, bookable}) {
  const [isEditing, setIsEditing] = useState(false);

  const {date} = useBookingsParams();
  const week = getWeek(date);
  const key = ["bookings", bookable.id, shortISO(week.start), shortISO(week.end)];

  const [user] = useUser();
  const isBooker = booking && user && (booking.bookerId === user.id);

  const {createBooking, isCreating} = useCreateBooking(key);
  const {updateBooking, isUpdating} = useUpdateBooking(key);
  const {deleteBooking, isDeleting} = useDeleteBooking(key);

  useEffect(() => {
    setIsEditing(booking && booking.id === undefined);
  }, [booking]);

  function handleSave (item) {
    setIsEditing(false);
    if (item.id === undefined) {
      createBooking({...item, bookerId: user.id});
    } else {
      updateBooking(item);
    }
  }

  function handleDelete (item) {
    if (window.confirm("Are you sure you want to delete the booking?")) {
      setIsEditing(false);
      deleteBooking(item.id);
    }
  }

  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button
              className="btn"
              onClick={() => setIsEditing(v => !v)}
            >
              <FaEdit/>
            </button>
          </span>
        )}
      </h2>

      {isCreating || isUpdating || isDeleting ? (
        <div className="booking-details-fields">
          <p>Saving...</p>
        </div>
      ) : isEditing ? (
        <BookingForm
          booking={booking}
          bookable={bookable}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ) : booking ? (
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