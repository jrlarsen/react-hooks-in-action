import {useReducer, useRef} from "react";
import reducer from "./weekReducer";
import {getWeek} from "../../utils/date-wrangler";
import {FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck} from "react-icons/fa";

export default function WeekPicker ({date}) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const textboxRef = useRef();

  function goToDate () {
    dispatch({
      type: "SET_DATE",
      payload: textboxRef.current.value
    });
  }

  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch({type: "PREV_WEEK"})}
        >
          <FaChevronLeft/>
          <span>Prev</span>
        </button>

        <button
          className="btn"
          onClick={() => dispatch({type: "TODAY"})}
        >
          <FaCalendarDay/>
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            ref={textboxRef}
            placeholder="e.g. 2020-09-02"
            defaultValue="2020-06-24"
          />

        <button
          className="go btn"
          onClick={goToDate}
        >
          <FaCalendarCheck/>
          <span>Go</span>
        </button>
      </span>

        <button
          className="btn"
          onClick={() => dispatch({type: "NEXT_WEEK"})}
        >
          <span>Next</span>
          <FaChevronRight/>
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}