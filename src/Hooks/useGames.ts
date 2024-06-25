import { GameQuery } from "../App";
import useData from "./useData";



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
    rating_top: number;
    rating: number;
  }

const useGames = (gameQuery:GameQuery) => useData<Game>('/games',{
  params: {
    genres: gameQuery.genre?.id, 
    platforms: gameQuery.platform?.id,
    ordering: gameQuery.sortOrder,
    search: gameQuery.searchText
  },
}, 
  [gameQuery]//dependency array
);


export default useGames;