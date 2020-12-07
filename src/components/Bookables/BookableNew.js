import BookableForm from "./BookableForm";
import useFormState from "./useFormState";

export default function BookableNew () {
  const status = "success";
  const error = {message: "Error!"};

  const formState = useFormState();

  function handleSubmit () {
  }

  if (status === "error") {
    return <p>{error.message}</p>
  }

  if (status === "loading") {
    return <p>Loading!!!</p>
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
    />
  );
}