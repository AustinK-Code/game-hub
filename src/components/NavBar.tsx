import { HStack, Image, } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import ColorModeSwitch from './ColorModeSwitch.tsx'
import SearchInput from './SearchInput.tsx'

const NavBar = () => {
  return (
    <HStack padding='10px'>
        <Image src={logo} alt="logo" boxSize="50px"/>
        <SearchInput/>
        <ColorModeSwitch/>
    </HStack>
  )
}

export default NavBar