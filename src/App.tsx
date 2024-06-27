import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Text,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./Hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./Hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import { BsChevronDown } from "react-icons/bs";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: '"nav" "main"',
        md: '"nav nav""aside main"',
      }}
      templateColumns={{
        baseL: "1fr",
        lg: "250px 1fr",
      }}
    >
      {/* For Big Screens */}
      <Show above="md">
        <GridItem area="nav">
          <NavBar
            onSearch={(searchText) =>
              setGameQuery({ ...gameQuery, searchText })
            }
          />
        </GridItem>
        <GridItem area="aside" padding={5}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
        <GridItem area="main">
          <Box paddingLeft={2}>
            <HStack>
              <GameHeading gameQuery={gameQuery} />
            </HStack>
            <HStack spacing={5} marginBottom={5}>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onSelectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
              />
              <SortSelector
                sortOrder={gameQuery.sortOrder}
                onSelectSortOrder={(sortOrder) =>
                  setGameQuery({ ...gameQuery, sortOrder })
                }
              />
              <Text>
                All Data pulled from{" "}
                <Link href="https://rawg.io/apidocs" color="teal.500">
                  RAWG.io
                </Link>
              </Text>
            </HStack>
          </Box>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>{" "}
      </Show>











      {/* Smol Screens */}
      <Show below="md">
        <GridItem area="nav">
          <NavBar
            onSearch={(searchText) =>
              setGameQuery({ ...gameQuery, searchText })
            }
          />
        </GridItem>
        <GridItem area="main">
          <Box paddingLeft={2}>
            <HStack>
              <GameHeading gameQuery={gameQuery} />
            </HStack>
            <HStack spacing={5} marginBottom={5}>
              <Menu>
                <MenuButton as={Button} rightIcon={<BsChevronDown />}>Filters</MenuButton>
                <MenuList display='flex' flexDirection='column' gap={3} padding={3}>
                  <PlatformSelector
                    selectedPlatform={gameQuery.platform}
                    onSelectPlatform={(platform) =>
                      setGameQuery({ ...gameQuery, platform })
                    }
                  />{" "}
                  <GenreList
                    selectedGenre={gameQuery.genre}
                    onSelectGenre={(genre) =>
                      setGameQuery({ ...gameQuery, genre })
                    }
                  />
                  <SortSelector
                    sortOrder={gameQuery.sortOrder}
                    onSelectSortOrder={(sortOrder) =>
                      setGameQuery({ ...gameQuery, sortOrder })
                    }
                  />
                </MenuList>
              </Menu>

              <Text>
                All Data pulled from{" "}
                <Link href="https://rawg.io/apidocs" color="teal.500">
                  RAWG.io
                </Link>
              </Text>
            </HStack>
          </Box>
          <GameGrid gameQuery={gameQuery} />
        </GridItem>{" "}
      </Show>
    </Grid>
  );
}

export default App;
