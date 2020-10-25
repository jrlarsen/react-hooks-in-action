import React from "react";
import {useNavigate} from "react-router-dom";
import {queryCache, useMutation} from "react-query";

import useFormState from "./useFormState";
import {createItem} from "../../utils/api";

import BookableForm from "./BookableForm";
import PageSpinner from "../UI/PageSpinner";

export default function BookableNew() {
  const navigate = useNavigate();
  const formState = useFormState();

  const [createBookable, {status, error}] = useMutation(

    item => createItem("http://localhost:3001/bookables", item),

    {
      onSuccess: bookable => {
        queryCache.setQueryData(
          "bookables",
          old => [...(old || []), bookable]
        );

        navigate(`/bookables/${bookable.id}`);
      }
    }
  );

  function handleSubmit() {
    createBookable(formState.state);
  }

  if (status === "error") {
    return <p>{error.message}</p>
  }

  if (status === "loading") {
    return <PageSpinner/>
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
    />
  );
}