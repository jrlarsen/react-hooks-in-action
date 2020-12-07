import {FaSpinner} from "react-icons/fa";

export default function Spinner (props) {
  return (
    <span {...props}>
      <FaSpinner className="icon-loading"/>
    </span>
  );
}