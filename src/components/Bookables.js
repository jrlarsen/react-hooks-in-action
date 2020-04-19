import React from "react";
import {bookables} from "../db.json";

export default function Bookables () {

  const group = "Rooms";

  const bookablesInGroup = bookables.filter(b => b.group === group);

  const bookableIndex = 1;

  return (
    <ul className="bookables">
      {bookablesInGroup.map((b, i) => (
        <li
          key={b.title}
          className={i === bookableIndex ? "selected" : null}
        >
          {b.title}
        </li>
      ))}
    </ul>
  );
}