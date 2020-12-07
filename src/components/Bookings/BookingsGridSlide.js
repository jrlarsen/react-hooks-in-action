import {useTransition, animated} from "react-spring";

import {shortISO} from "../../utils/date-wrangler";

import BookingsGrid from "./BookingsGrid";

export default function BookingsGridSlide (props) {
  const {week, bookable, booking, setBooking} = props;

  const transitions = useTransition(
    {bookable, week},
    item => `${item.bookable.id}_${shortISO(item.week.start)}`,
    {
      from: {opacity: 1, transform: 'translate3d(0, -100%, 0)'},
      enter: {opacity: 1, transform: 'translate3d(0, 0, 0)'},
      leave: {opacity: 0, transform: 'translate3d(0, 20%, 0)'}
    }
  );

  return (
    <div className="grid-wrapper">
      {transitions.map(({item, props, key}) => (
        <animated.div
          className="grid"
          style={{...props}}
          key={key}
        >
          <BookingsGrid
            week={item.week}
            bookable={item.bookable}
            booking={booking}
            setBooking={setBooking}
          />
        </animated.div>
      ))}
    </div>
  );
}