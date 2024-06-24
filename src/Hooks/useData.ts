import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


interface FetchResponse<T> {
    count: number;
    results: T[];
}


const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]); 
    const [error, setError] = useState(""); //set the type of 'error' as a string. Ititialize it as an empty string
    const [isLoading, setLoading] = useState(false); //set the type of 'isLoading' as a boolean. Initialize it as false

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true); // Set isLoading to true

    apiClient
    .get<FetchResponse<T>>(endpoint, { signal: controller.signal }) // Fill up a FetchGeneresResponse object with the data from the API
      .then((res) => {
        setData(res.data.results);// Set the state to the results of the API call
        setLoading(false);}) //set isLoading to false to remove the loading skeleton
      .catch((err) => {
        if (err instanceof CanceledError) return; // If the error is an instance of CanceledError, return
        setError(err.message)
        setLoading(false); //set isLoading to false to remove the loading skeleton
    });
      return () => controller.abort(); // Abort the controller when the component unmounts
  },[]);

  return { data, error, isLoading };

}

export default useData;