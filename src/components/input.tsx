import { Flex, Icon, Input as ChakraInput, InputProps } from "@chakra-ui/react"
import { MdSearch } from "react-icons/md"

export function Input(props: InputProps) {
  return (
    <Flex
      flex={1}
      bg="secondary"
      align="center"
      paddingY="0.25rem"
      borderRadius="6px"
    >
      <ChakraInput
        bg="transparent"
        border="none"
        textTransform="capitalize"
        _focus={{ boxShadow: "none" }}
        _placeholder={{
          textTransform: "initial",
        }}
        {...props}
      />
      <Icon as={MdSearch} fontSize="1.5rem" marginRight="1rem" />
    </Flex>
  )
}
