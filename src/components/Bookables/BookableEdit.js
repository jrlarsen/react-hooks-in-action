import {useParams} from "react-router-dom";
import {useQueryClient, useQuery} from "react-query";

import useFormState from "./useFormState";
import getData from "../../utils/api";

import BookableForm from "./BookableForm";
import PageSpinner from "../UI/PageSpinner";

export default function BookableEdit () {
  const {id} = useParams();
  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery(
    ["bookable", id],
    () => getData(`http://localhost:3001/bookables/${id}`),
    {
      initialData:
        queryClient.getQueryData("bookables")
          ?.find(b => b.id === parseInt(id, 10))
    }
  );

  const formState = useFormState(data);

  function handleDelete () {
  }

  function handleSubmit () {
  }

  if (isLoading) {
    return <PageSpinner/>
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
}