import { useState } from 'react'
import { colorChange } from '../services/handleButtonClick.js'

export const useColor = (initialColor) => {
  const [color, setColor] = useState(initialColor)
  const handleColorChange = colorChange(setColor)
  return { color, setColor, handleColorChange }
}
