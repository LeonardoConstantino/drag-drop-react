import { calculateLocalStorageSize, findIndexNoteById } from '../utils/helpers'

/**
 * Salva o conteúdo de um campo de entrada em uma nota específica e atualiza o tamanho ocupado no localStorage.
 *
 * @param {function} findIndexNoteById - Função que encontra o índice de, listNotes uma nota pelo ID.
 * @param {Array<Object>} listNotes - Lista atual de notas.
 * @param {function} updateListNotes - Função para atualizar uma nota na lista.
 * @param {function} setSizeOccupiedByLocalStorage - Função para definir o tamanho ocupado pelo localStorage.
 * @returns {function} - Função que, quando chamada com um evento e um ID de nota, salva o conteúdo de entrada na nota correspondente.
 */
export const saveInputContent = (
  listNotes,
  updateListNotes,
  setSizeOccupiedByLocalStorage
) => {
  return (e, noteId) => {
    const noteIndex = findIndexNoteById(noteId, listNotes)

    const newContent = e.target.value

    const updatedNote = {
      ...listNotes[noteIndex],
      contente: newContent,
    }

    updateListNotes(noteIndex, updatedNote)
    setSizeOccupiedByLocalStorage(calculateLocalStorageSize(listNotes))
  }
}

/**
 * Manipula o redimensionamento automático da altura de uma textarea com base no seu conteúdo.
 *
 * @param {Event} e - O evento de input que acionou o redimensionamento.
 */
export const TextareaResize = () => {
  return (e) => {
    const textarea = e.target
    const maxHeight = 200
    const getNewHeight = (scrollHeight) => Math.min(scrollHeight, maxHeight)
    textarea.style.height = 'auto'
    textarea.style.height = `${getNewHeight(textarea.scrollHeight)}px`
  }
}
