import { useCallback, useState } from 'react'
import {
  startInteraction,
  moveInteraction,
  endInteraction,
} from '../services/handleDrag.js'

export const useDrag = (listNotes, updateListNotes) => {
  const [isDragging, setIsDragging] = useState(false)
  const [cursor, setCursor] = useState({ x: null, y: null })
  const [positionCurrentNote, setPositionCurrentNote] = useState({
    x: null,
    y: null,
    noteId: null,
  })

  const handleStartInteraction = startInteraction(
    setIsDragging,
    setCursor,
    setPositionCurrentNote
  )

  const handleMoveInteraction = useCallback(
    moveInteraction(
      isDragging,
      positionCurrentNote,
      cursor,
      listNotes,
      updateListNotes
    ),
    [isDragging, cursor, positionCurrentNote, listNotes]
  )

  const handleEndInteraction = endInteraction(
    positionCurrentNote,
    listNotes,
    updateListNotes,
    setPositionCurrentNote,
    setIsDragging
  )

  return {
    isDragging,
    setIsDragging,
    cursor,
    positionCurrentNote,
    setPositionCurrentNote,
    handleStartInteraction,
    handleMoveInteraction,
    handleEndInteraction,
  }
}
