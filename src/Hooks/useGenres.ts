import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}

interface FetchGenresResponse {
    count: number;
    results: Genre[];
}


const useGenres = () => {
    const [genres, setGames] = useState<Genre[]>([]); // Specify the type of 'genres' as an array of Game objects. Set the initial value to an empty array
    const [error, setError] = useState(""); //set the type of 'error' as a string. Ititialize it as an empty string
    const [isLoading, setLoading] = useState(false); //set the type of 'isLoading' as a boolean. Initialize it as false

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true); // Set isLoading to true

    apiClient
    .get<FetchGenresResponse>("/genres", { signal: controller.signal }) // Fill up a FetchGeneresResponse object with the data from the API
      .then((res) => {
        setGames(res.data.results);// Set the state to the results of the API call
        setLoading(false);}) //set isLoading to false to remove the loading skeleton
      .catch((err) => {
        if (err instanceof CanceledError) return; // If the error is an instance of CanceledError, return
        setError(err.message)
        setLoading(false); //set isLoading to false to remove the loading skeleton
    });
      return () => controller.abort(); // Abort the controller when the component unmounts
  },[]);

  return { genres, error, isLoading };

}

export default useGenres;