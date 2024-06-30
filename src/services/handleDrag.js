import { findIndexNoteById } from '../utils/helpers'

/**
 * Manipula o evento mousedown para iniciar o movimento de uma nota.
 *
 * @param {function} setIsDragging - Função para alternar o estado de mousedown.
 * @param {function} setCursor - Função para definir a posição do cursor.
 * @param {function} setPositionCurrentNote - Função para definir a posição atual da nota.
 * @returns {function} - Função que, quando chamada com um evento e um ID de nota, inicia o movimento da nota.
 */
export const startInteraction = (
  setIsDragging,
  setCursor,
  setPositionCurrentNote
) => {
  return (e, noteId) => {
    setIsDragging(true)

    const clientX = e.clientX || e.touches[0].clientX
    const clientY = e.clientY || e.touches[0].clientY

    setCursor({ x: clientX, y: clientY })

    setPositionCurrentNote({
      x: e.target.getBoundingClientRect().left,
      y: e.target.getBoundingClientRect().top,
      noteId,
    })
  }
}

/**
 * Manipula o movimento do mouse para arrastar uma nota.
 *
 * @param {boolean} isDragging - Indica se o botão do mouse está pressionado.
 * @param {Object} positionCurrentNote - Posição atual da nota.
 * @param {number} positionCurrentNote.x - Posição x atual da nota.
 * @param {number} positionCurrentNote.y - Posição y atual da nota.
 * @param {number} positionCurrentNote.noteId - ID da nota atual.
 * @param {Object} cursor - Posição inicial do cursor do mouse.
 * @param {number} cursor.x - Posição x inicial do cursor.
 * @param {number} cursor.y - Posição y inicial do cursor.
 * @param {Array} listNotes - Lista de todas as notas.
 * @param {function} updateListNotes - Função para atualizar a lista de notas.
 * @returns {function} - Função que manipula o evento de movimento do mouse.
 */
export const moveInteraction = (
  isDragging,
  positionCurrentNote,
  cursor,
  listNotes,
  updateListNotes
) => {
  return (e) => {
    if (!isDragging || positionCurrentNote.noteId === null) return

    const noteIndex = findIndexNoteById(positionCurrentNote.noteId, listNotes)

    if (noteIndex === -1) return

    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)

    if (clientX === undefined || clientY === undefined) return

    const newCursorPosition = { x: clientX, y: clientY }

    const endPosition = {
      x: newCursorPosition.x - cursor.x,
      y: newCursorPosition.y - cursor.y,
    }

    const updatedNote = {
      ...listNotes[noteIndex],
      top: positionCurrentNote.y + endPosition.y,
      left: positionCurrentNote.x + endPosition.x,
      cursor: 'grabbing',
    }
    updateListNotes(noteIndex, updatedNote)
  }
}

/**
 * Manipula o evento de soltar o botão do mouse após arrastar uma nota.
 *
 * @param {Object} positionCurrentNote - Posição atual da nota.
 * @param {number} positionCurrentNote.x - Posição x atual da nota.
 * @param {number} positionCurrentNote.y - Posição y atual da nota.
 * @param {number} positionCurrentNote.noteId - ID da nota atual.
 * @param {Array} listNotes - Lista de todas as notas.
 * @param {function} updateListNotes - Função para atualizar a lista de notas.
 * @param {function} setPositionCurrentNote - Função para definir a posição atual da nota.
 * @param {function} setIsDragging - Função para alternar o estado de pressionamento do mouse.
 * @returns {function} - Função que manipula o evento de soltar o botão do mouse.
 */
export const endInteraction = (
  positionCurrentNote,
  listNotes,
  updateListNotes,
  setPositionCurrentNote,
  setIsDragging
) => {
  return () => {
    if (positionCurrentNote.noteId === null) return

    const noteIndex = findIndexNoteById(positionCurrentNote.noteId, listNotes)

    if (noteIndex === -1) return

    const updatedNote = { ...listNotes[noteIndex], cursor: null }
    updateListNotes(noteIndex, updatedNote)

    setPositionCurrentNote({ x: null, y: null, noteId: null })
    setIsDragging(false)
  }
}
