import { findIndexNoteById } from '../utils/helpers'
/**
 * Move uma nota para cima na camada, aumentando seu z-index.
 *
 * @param {function} findIndexNote - Função que encontra o índice de uma nota pelo ID.
 * @param {Array<Object>} listNotes - Lista atual de notas.
 * @param {function} updateListNotes - Função para atualizar uma nota na lista.
 * @returns {function} - Função que, quando chamada com um ID de nota, move essa nota para cima na camada.
 */
export const moveLayerUp = (listNotes, updateListNotes) => {
  return (noteId) => {
    const noteIndex = findIndexNoteById(noteId, listNotes)
    if (noteIndex === -1) return

    const zIndex = listNotes[noteIndex].zIndex || 0
    const maxZIndex = Math.max(...listNotes.map((note) => note.zIndex || 0))

    const updatedNote = {
      ...listNotes[noteIndex],
      zIndex: Math.min(zIndex + 1, maxZIndex + 1),
    }

    updateListNotes(noteIndex, updatedNote)
  }
}

/**
 * Move uma nota para baixo na camada, diminuindo seu z-index.
 *
 * @param {function} findIndexNote - Função que encontra o índice de uma nota pelo ID.
 * @param {Array<Object>} listNotes - Lista atual de notas.
 * @param {function} updateListNotes - Função para atualizar uma nota na lista.
 * @returns {function} - Função que, quando chamada com um ID de nota, move essa nota para baixo na camada.
 */
export const moveLayerdown = (listNotes, updateListNotes) => {
  return (noteId) => {
    const noteIndex = findIndexNoteById(noteId, listNotes)
    if (noteIndex === -1) return

    const zIndex = listNotes[noteIndex].zIndex || 0

    const updatedNote = {
      ...listNotes[noteIndex],
      zIndex: Math.max(zIndex - 1, 0),
    }

    updateListNotes(noteIndex, updatedNote)
  }
}
