import {useState} from 'react';
import {bookables} from "../../static.json";
import {FaArrowRight} from "react-icons/fa";

export default function BookablesList () {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(1);

  function nextBookable () {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }

  return (
    <div>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
          <li
            key={b.id}
            className={i === bookableIndex ? "selected" : null}
          >
            <button
              className="btn"
              onClick={() => setBookableIndex(i)}
            >
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          autoFocus
        >
          <FaArrowRight/>
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}