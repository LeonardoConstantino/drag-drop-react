import { useState, useEffect } from 'react'
import { useColor } from './useColor.js'
import { useNotesList } from './useNotesList.js'
import { useDrag } from './useDrag.js'
import { storageUtil } from '../utils/storageUtil.js'
import {
  clickButtonPlus,
  centralizeNotes,
} from '../services/handleButtonClick.js'
import { saveInputContent } from '../services/handleTextarea.js'
import { moveLayerUp, moveLayerdown } from '../services/handleLayers.js'

storageUtil.setAppPrefix('appNotes')

const storage = storageUtil.getItem('listNotes') || []

export const useNotes = () => {
  const { color, setColor, handleColorChange } = useColor('#e6b905')

  const {
    listNotes,
    setListNotes,
    sizeOccupiedByLocalStorage,
    setSizeOccupiedByLocalStorage,
    updateListNotes,
    removeNote,
  } = useNotesList(storage)

  const {
    isDragging,
    setIsDragging,
    cursor,
    positionCurrentNote,
    setPositionCurrentNote,
    handleStartInteraction,
    handleMoveInteraction,
    handleEndInteraction,
  } = useDrag(listNotes, updateListNotes)

  const [isCentralizing, setIsCentralizing] = useState(false)

  const handleClickButtonPlus = clickButtonPlus(
    color,
    setListNotes,
    listNotes,
    setSizeOccupiedByLocalStorage
  )

  const handleMoveLayerUp = moveLayerUp(listNotes, updateListNotes)

  const handleMoveLayerdown = moveLayerdown(listNotes, updateListNotes)

  const handleCentralize = centralizeNotes(
    setIsCentralizing,
    listNotes,
    setListNotes
  )

  const handleInputContent = saveInputContent(
    listNotes,
    updateListNotes,
    setSizeOccupiedByLocalStorage
  )

  useEffect(() => {
    storageUtil.setItem('listNotes', listNotes)
  }, [listNotes])

  return {
    color,
    setColor,
    isDragging,
    setIsDragging,
    isCentralizing,
    sizeOccupiedByLocalStorage,
    listNotes,
    cursor,
    positionCurrentNote,
    setPositionCurrentNote,
    handleClickButtonPlus,
    handleColorChange,
    removeNote,
    updateListNotes,
    handleMoveLayerUp,
    handleMoveLayerdown,
    handleCentralize,
    handleInputContent,
    handleStartInteraction,
    handleMoveInteraction,
    handleEndInteraction,
  }
}
