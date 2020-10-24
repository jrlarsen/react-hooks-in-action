import {useEffect, useState} from "react";
import getData from "./api";

export default function useFetch (url) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let doUpdate = true;

    setStatus("loading");
    setData(undefined);
    setError(null);

    getData(url)
      .then(data => {
        if (doUpdate) {
          setData(data);
          setStatus("success");
        }
      })
      .catch(error => {
        if (doUpdate) {
          setError(error);
          setStatus("error");
        }
      });

    return () => doUpdate = false;
  }, [url]);

  return {data, status, error};
}