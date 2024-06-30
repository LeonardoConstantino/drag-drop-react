/**
 * Retorna uma cor de contraste (preto ou branco) com base na cor hexadecimal fornecida.
 *
 * @param {string} hex - A cor em formato hexadecimal (por exemplo, '#RRGGBB').
 * @returns {string} - A cor de contraste ('#000000' para preto ou '#FFFFFF' para branco).
 */
export const getContrastColor = (hex) => {
  hex = hex.replace(/^#/, '')

  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  let brightness = (r * 299 + g * 587 + b * 114) / 1000

  return brightness > 128 ? '#000000' : '#FFFFFF'
}

/**
 * Calcula o tamanho aproximado de uma string quando armazenada no localStorage.
 *
 * @param {string} string - A string cujo tamanho será calculado.
 * @returns {string} Uma string indicando o tamanho da string fornecida no formato de bytes, kilobytes ou megabytes.
 */
export const calculateLocalStorageSize = (string) => {
  const localStorageItem = JSON.stringify(string)
  const bytes = new Blob([localStorageItem]).size

  if (bytes < 1024) {
    return `${bytes.toLocaleString()} bytes`
  } else if (bytes < 1024 * 1024) {
    const kilobytes = bytes / 1024
    return `${kilobytes.toFixed(2)} KB`
  } else {
    const megabytes = bytes / (1024 * 1024)
    return `${megabytes.toFixed(2)} MB`
  }
}

/**
 * Atualiza uma nota específica na lista de notas e define a lista de notas atualizada.
 *
 * @param {Array<Object>} listNotes - Lista atual de notas.
 * @param {function} setListNotes - Função para definir a lista de notas atualizada.
 * @returns {function} - Função que, quando chamada com o índice da nota atual e a nova nota, atualiza a nota na lista.
 */
export const listNotesUpdate = (listNotes, setListNotes) => {
  return (indexCurrentNote, newNote) => {
    const updatedListNotes = [...listNotes]
    updatedListNotes[indexCurrentNote] = newNote
    setListNotes(updatedListNotes)
  }
}

/**
 * Remove uma nota da lista de notas pelo ID e atualiza o tamanho ocupado no localStorage.
 *
 * @param {function} setListNotes - Função para definir a lista de notas atualizada.
 * @param {Array<Object>} listNotes - Lista atual de notas.
 * @param {function} setSizeOccupiedByLocalStorage - Função para definir o tamanho ocupado pelo localStorage.
 * @returns {function} - Função que, quando chamada com um ID de nota, remove a nota correspondente da lista.
 */
export const removeNoteById = (
  setListNotes,
  listNotes,
  setSizeOccupiedByLocalStorage
) => {
  return (removedId) => {
    setListNotes(listNotes.filter(({ id }) => id !== removedId))
    setSizeOccupiedByLocalStorage(calculateLocalStorageSize(listNotes))
  }
}

/**
 * Encontra o índice de uma nota na lista de notas pelo seu ID.
 *
 * @param {Array<Object>} listNotes - Lista atual de notas.
 * @returns {function} - Função que, quando chamada com um ID de nota, retorna o índice da nota na lista ou -1 se não for encontrada.
 */
export const findIndexNoteById = (noteId, listNotes) =>
  listNotes.findIndex(({ id }) => id === noteId)
