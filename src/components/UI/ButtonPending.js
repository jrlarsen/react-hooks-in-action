import {unstable_useTransition as useTransition} from 'react';
import Spinner from "./Spinner";

export default function ButtonPending ({children, onClick, ...props}) {
  const [startTransition, isPending] = useTransition();

  function handleClick () {
    startTransition(onClick);
  }

  return (
    <button onClick={handleClick} {...props}>
      {isPending && <Spinner/>}
      {children}
      {isPending && <Spinner/>}
    </button>
  );
}