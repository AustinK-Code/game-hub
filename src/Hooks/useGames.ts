import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

// Hook used to fetch games from the API
//Example: const { games, error } = useGames();

export interface Platform {
    // Define the properties of the Platform interface
    // platform: {
    id: number;
    slug: string;
    name: string;
    // };
}

// Hook used to fetch games from the API
//Example: const { games, error } = useGames();

export interface Platform {
    // Define the properties of the Platform interface
    // platform: {
    id: number;
    slug: string;
    name: string;
    // };
}

export interface Game {
    // Define the properties of the Game interface
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform:Platform}[];// The API is weird and returns an array of objects with a platform property
  }
  
  interface FetchGamesResponse {
    // Define the properties of the FetchGamesResponse interface. This is the object the API will return when we fetch games.
    // Define the properties of the FetchGamesResponse interface. This is the object the API will return when we fetch games.
    count: number;
    results: Game[];
  }

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]); // Specify the type of 'games' as an array of Game objects. Set the initial value to an empty array
    const [error, setError] = useState(""); //set the type of 'error' as a string. Ititialize it as an empty string

  useEffect(() => {
    const controller = new AbortController();
    apiClient
    .get<FetchGamesResponse>("/games", { signal: controller.signal }) // Fill up a FetchGamesResponse object with the data from the API
      .then((res) => {
        setGames(res.data.results)}) // Set the games state to the results of the API call
      .catch((err) => {
        if (err instanceof CanceledError) return; // If the error is an instance of CanceledError, return
        setError(err.message)
    });
      return () => controller.abort(); // Abort the controller when the component unmounts
  },[]);

  return { games, error };
  
}

export default useGames;