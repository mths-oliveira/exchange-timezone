import { Image, ImageProps, Tooltip } from "@chakra-ui/react"
import { removeAccent } from "../utils/remove-accent"

interface FlagImageProps extends ImageProps {
  country: string
}

export function FlagImage({ country, ...rest }: FlagImageProps) {
  const formatedCountry = removeAccent(country)
    .toLowerCase()
    .replace(/\W/g, "-")
  return (
    <Tooltip
      label={country}
      hasArrow
      marginTop="-0.5rem"
      bg="text"
      color="primary"
      closeOnClick={false}
    >
      <Image
        alt={country}
        src={`/${formatedCountry}.png`}
        filter="drop-shadow(0 0 12px rgba(0,0,0,0.1))"
        marginX="1rem"
        {...rest}
      />
    </Tooltip>
  )
}
