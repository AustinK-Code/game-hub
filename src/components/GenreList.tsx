import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  IconButton,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Show
} from "@chakra-ui/react";
import useGenres, { Genre } from "../Hooks/useGenres";
import { getCroppedImageUrl } from "../services/image-url";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectGenre: (genre: Genre) => void; //notifies parent App.tsx of the selected genre
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { data, isLoading, error } = useGenres();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    null;
  }

  if (collapsed) {
    return (
      <>
        <IconButton
          aria-label="Search database"
          onClick={() => setCollapsed(!collapsed)}
          icon={<MdMenu />}
        />
      </>
    );
  }

  return (
    <>
    <Show below="md">
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>} >Genre</MenuButton>
        <MenuList>
          {data.map((genre) => (
            <MenuItem key={genre.id} paddingY="5px">
              <HStack>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  objectFit="cover"
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Button
                  fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                  onClick={() => onSelectGenre(genre)}
                  fontSize="lg"
                  variant="link"
                  whiteSpace="normal"
                  textAlign="left"
                >
                  {genre.name}
                </Button>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
        </Menu>
    </Show>
    

    
      <Show above="md">
        <HStack marginBottom={3}>
          <Heading fontSize="2xl">
            <HStack>
              <IconButton
                size={"sm"}
                aria-label="Search database"
                onClick={() => setCollapsed(!collapsed)}
                icon={<MdMenu />}
              />
              <Text>Genres</Text>
            </HStack>
          </Heading>
        </HStack>
        <List>
          {data.map((genre) => (
            <ListItem key={genre.id} paddingY="5px">
              <HStack>
                <Image
                  boxSize="32px"
                  borderRadius={8}
                  objectFit="cover"
                  src={getCroppedImageUrl(genre.image_background)}
                />
                <Button
                  fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                  onClick={() => onSelectGenre(genre)}
                  fontSize="lg"
                  variant="link"
                  whiteSpace="normal"
                  textAlign="left"
                >
                  {genre.name}
                </Button>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Show>
    </>
  );
};

export default GenreList;
