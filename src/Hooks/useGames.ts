import useData from "./useData";
import { Genre } from "./useGenres";



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
    metacritic: number;
  }

const useGames = (selectedGenre: Genre | null) => useData<Game>('/games',{params: {genres: selectedGenre?.id}}, [selectedGenre?.id]);


export default useGames;