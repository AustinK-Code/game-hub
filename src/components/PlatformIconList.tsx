import { Platform } from "../Hooks/useGames";
import { Text } from "@chakra-ui/react";

interface Props {
  platforms: { platform: Platform }[];
}

const PlatformIconList = ({ platforms }: Props) => {
  return (
    <>
      {platforms.map(({ platform }) => (
        <Text key={platform.id}>{platform.name}</Text>
      ))}
    </>
  );
};

export default PlatformIconList;
