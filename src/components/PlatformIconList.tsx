import {
  FaWindows,
  FaXbox,
  FaPlaystation,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { Platform } from "../Hooks/useGames";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  platforms: { platform: Platform }[];
}

const PlatformIconList = ({ platforms }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    xbox: FaXbox,
    playstation: FaPlaystation,
    ios: MdPhoneIphone,
    android: FaAndroid,
    linux: FaLinux,
    apple: FaApple,
    nintendo: SiNintendo,
    web: BsGlobe,
  };

  return (
    <>

      <HStack marginY={1}>    {/* puts in a nice line. Multiple of theme.space */}
        {platforms.map(({ platform }) => (
          <Icon as={iconMap[platform.slug]} key={platform.id} color='gray.500'/>
        ))}
      </HStack>
    </>
  );
};

export default PlatformIconList;
