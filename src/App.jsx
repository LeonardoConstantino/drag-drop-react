import { useEffect, useState, useCallback } from 'react'
import { storageUtil } from './utils/storageUtil.js'
import { Note } from './components/note.jsx'
import { Icon } from './components/icon'
import Plus from './assets/images/Plus.svg'
import center from './assets/images/HorizontalAlignCenter.svg'
import { calculateLocalStorageSize } from './utils/helpers.js'

const storage = storageUtil.getItem('listNotes')

const currentSizeOccupiedByLocalStorage = calculateLocalStorageSize(storage)

export const App = () => {
  const [color, setColor] = useState('#e6b905')
  const [mousedown, setMousedown] = useState(false)
  const [centralizing, setCentralizing] = useState(false)
  const [sizeOccupiedByLocalStorage, setSizeOccupiedByLocalStorage] = useState(
    currentSizeOccupiedByLocalStorage
  )
  const [listNotes, setListNotes] = useState([...(storage || [])])
  const [cursor, setCursor] = useState({ x: null, y: null })
  const [positionCurrentNote, setPositionCurrentNote] = useState({
    x: null,
    y: null,
    noteId: null,
  })

  const toggleMousedown = () => setMousedown(!mousedown)

  const handleClickButtonPlus = () => {
    const newNote = {
      color: color,
      contente: '',
      top: 51,
      left: 101,
      id: Date.now(),
      cursor: null,
      zIndex: null,
      class: 'slide-in-blurred-br',
    }
    setListNotes([...listNotes, newNote])
    setSizeOccupiedByLocalStorage(calculateLocalStorageSize(listNotes))
  }

  const handleColorChange = (e) => setColor(e.target.value)

  const removeNote = (removedId) => {
    setListNotes(listNotes.filter(({ id }) => id !== removedId))
    setSizeOccupiedByLocalStorage(calculateLocalStorageSize(listNotes))
  }

  const findIndexNote = (noteId) =>
    listNotes.findIndex(({ id }) => id === noteId)

  const updateListNotes = (indexCurrentNote, newNote) => {
    const updatedListNotes = [...listNotes]
    updatedListNotes[indexCurrentNote] = newNote
    setListNotes(updatedListNotes)
  }

  const handleMoveLayerUp = (noteId) => {
    const noteIndex = findIndexNote(noteId)
    if (noteIndex === -1) return

    const zIndex = listNotes[noteIndex].zIndex || 0
    const maxZIndex = Math.max(...listNotes.map((note) => note.zIndex || 0))

    const updatedNote = {
      ...listNotes[noteIndex],
      zIndex: Math.min(zIndex + 1, maxZIndex + 1),
    }

    updateListNotes(noteIndex, updatedNote)
  }

  const handleMoveLayerdown = (noteId) => {
    const noteIndex = findIndexNote(noteId)
    if (noteIndex === -1) return

    const zIndex = listNotes[noteIndex].zIndex || 0

    const updatedNote = {
      ...listNotes[noteIndex],
      zIndex: Math.max(zIndex - 1, 0),
    }

    updateListNotes(noteIndex, updatedNote)
  }

  const centralize = () => {
    setCentralizing(true)
    const totalNotes = listNotes.length
    const maxColumns = Math.floor(window.innerWidth / 200)
    const maxNotesPerColumn = Math.ceil(totalNotes / maxColumns)

    const noteHeight = 197
    const noteWidth = 136
    const spacingY = (window.innerHeight - noteHeight) / (maxNotesPerColumn - 1)
    const initialY = 50
    const columns = Math.ceil(totalNotes / maxNotesPerColumn)
    const spacingX = (window.innerWidth - columns * noteWidth) / (columns + 1)

    const updatedListNotes = listNotes.map((note, index) => {
      const column = Math.floor(index / maxNotesPerColumn)
      const row = index % maxNotesPerColumn

      return {
        ...note,
        top: initialY + row * spacingY,
        left: spacingX + column * (noteWidth + spacingX),
      }
    })

    setListNotes(updatedListNotes)

    setTimeout(() => {
      setCentralizing(false)
    }, 500)
  }

  const saveInputContent = (e, noteId) => {
    const noteIndex = findIndexNote(noteId)

    const newContent = e.target.value

    const updatedNote = {
      ...listNotes[noteIndex],
      contente: newContent,
    }

    updateListNotes(noteIndex, updatedNote)
    setSizeOccupiedByLocalStorage(calculateLocalStorageSize(listNotes))
  }

  const handleMousedown = (e, noteId) => {
    toggleMousedown()

    setCursor({ x: e.clientX, y: e.clientY })

    setPositionCurrentNote({
      x: e.target.getBoundingClientRect().left,
      y: e.target.getBoundingClientRect().top,
      noteId,
    })
  }

  const handleMousemove = useCallback(
    (e) => {
      if (!mousedown || positionCurrentNote.noteId === null) return

      const noteIndex = findIndexNote(positionCurrentNote.noteId)

      if (noteIndex === -1) return

      const newCursorPosition = { x: e.clientX, y: e.clientY }

      const endPosition = {
        x: newCursorPosition.x - cursor.x,
        y: newCursorPosition.y - cursor.y,
      }

      const updatedNote = {
        ...listNotes[noteIndex],
        top: positionCurrentNote.y + endPosition.y,
        left: positionCurrentNote.x + endPosition.x,
        cursor: mousedown && 'grabbing',
      }
      updateListNotes(noteIndex, updatedNote)
    },
    [
      mousedown,
      cursor,
      positionCurrentNote,
      listNotes
    ]
  )

  const handleMouseup = () => {
    if (positionCurrentNote.noteId === null) return

    const noteIndex = findIndexNote(positionCurrentNote.noteId)

    if (noteIndex === -1) return

    const updatedNote = { ...listNotes[noteIndex], cursor: null }
    updateListNotes(noteIndex, updatedNote)

    setPositionCurrentNote({ x: null, y: null, noteId: null })
    toggleMousedown()
  }

  useEffect(() => {
    storageUtil.setItem('listNotes', listNotes)
  }, [listNotes])

  useEffect(() => {
    if (mousedown) {
      document.addEventListener('mousemove', handleMousemove)
      document.addEventListener('mouseup', handleMouseup)
    } else {
      document.removeEventListener('mousemove', handleMousemove)
      document.removeEventListener('mouseup', handleMouseup)
    }
    return () => {
      document.removeEventListener('mousemove', handleMousemove)
      document.removeEventListener('mouseup', handleMouseup)
    }
  }, [mousedown, handleMousemove])

  return (
    <main>
      <form name='add'>
        <div className="add">
        <label for="color"></label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={handleColorChange}
          />
          <button type="button" onClick={handleClickButtonPlus}>
            <Icon iconUrl={Plus} className={'Plus'} />
          </button>
        </div>
        <button type="button" onClick={centralize}>
          <Icon iconUrl={center} />
        </button>
        <p className="info">
          <span>{sizeOccupiedByLocalStorage}</span> / ~5 MB
        </p>
      </form>
      <div id="list">
        {listNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            centralizing={centralizing}
            removeItem={removeNote}
            handleMousedown={handleMousedown}
            handleMousemove={handleMousemove}
            handleMouseup={handleMouseup}
            salveInputContent={saveInputContent}
            handleMoveLayerUp={handleMoveLayerUp}
            handleMoveLayerdown={handleMoveLayerdown}
          />
        ))}
      </div>
    </main>
  )
}
