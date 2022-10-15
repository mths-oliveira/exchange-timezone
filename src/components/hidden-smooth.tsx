import { motion } from "framer-motion"
import { ReactNode } from "react"

interface HiddenSmoothProps {
  children: ReactNode
}

export function HiddenSmooth({ children }: HiddenSmoothProps) {
  return (
    <motion.div
      initial={{ y: "50%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
