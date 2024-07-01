import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react'

const ColorModeSwitch = () => {
    const { toggleColorMode, colorMode } = useColorMode() //built in Chakra UI hook to change color mode

  return (
    <HStack>
      <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} colorScheme='green'/>
      <Text whiteSpace='nowrap'>Dark Mode</Text>
    </HStack>
  )
}

export default ColorModeSwitch