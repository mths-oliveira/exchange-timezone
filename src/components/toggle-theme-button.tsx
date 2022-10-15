import { useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton } from "./icon-button"

export function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      bg="secondary"
      icon={colorMode === "light" ? MoonIcon : SunIcon}
      marginX="1rem"
      borderRadius="6px"
      onClick={toggleColorMode}
    />
  )
}
