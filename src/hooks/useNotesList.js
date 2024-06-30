import { useEffect, useState } from 'react'
import { storageUtil } from '../utils/storageUtil.js'
import {
  calculateLocalStorageSize,
  listNotesUpdate,
  removeNoteById,
} from '../utils/helpers.js'

export const useNotesList = (initialNotes) => {
  const [listNotes, setListNotes] = useState([...initialNotes])
  const [sizeOccupiedByLocalStorage, setSizeOccupiedByLocalStorage] = useState(
    calculateLocalStorageSize(initialNotes)
  )

  const updateListNotes = listNotesUpdate(listNotes, setListNotes)
  
  const removeNote = removeNoteById(
    setListNotes,
    listNotes,
    setSizeOccupiedByLocalStorage
  )

  useEffect(() => {
    storageUtil.setItem('listNotes', listNotes)
  }, [listNotes])

  return {
    listNotes,
    setListNotes,
    sizeOccupiedByLocalStorage,
    setSizeOccupiedByLocalStorage,
    updateListNotes,
    removeNote,
  }
}
