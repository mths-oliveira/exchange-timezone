import { Box, Flex, Text } from "@chakra-ui/react"
import { FlagImage } from "./flag-image"

interface ProfileProps {
  country: string
  title: string
  text: string
}

export function Profile({ country, text, title }: ProfileProps) {
  return (
    <Flex alignItems="center">
      <FlagImage country={country} />
      <Box fontWeight="600">
        <Text>{title}</Text>
        <Text fontSize="14px" color="altText">
          {text}
        </Text>
      </Box>
    </Flex>
  )
}
