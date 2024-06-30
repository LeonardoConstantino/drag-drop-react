import { calculateLocalStorageSize } from '../utils/helpers'

/**
 * Cria uma função que altera a cor com base no valor do alvo do evento.
 *
 * @param {function} setColor - Função para definir a nova cor.
 * @returns {function} - Função que, quando chamada com um evento, altera a cor com base no valor do alvo do evento.
 */
export const colorChange = (setColor) => {
  return (e) => setColor(e.target.value)
}

/**
 * Adiciona uma nova nota à lista de notas com uma cor específica e atualiza o tamanho ocupado no localStorage.
 *
 * @param {string} color - Cor da nova nota.
 * @param {function} setListNotes - Função para definir a lista de notas atualizada.
 * @param {Array<Object>} listNotes - Lista atual de notas.
 * @param {function} setSizeOccupiedByLocalStorage - Função para definir o tamanho ocupado pelo localStorage.
 * @returns {function} - Função que, quando chamada, adiciona uma nova nota à lista de notas.
 */
export const clickButtonPlus = (
  color,
  setListNotes,
  listNotes,
  setSizeOccupiedByLocalStorage
) => {
  return () => {
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
    const updatedListNotes = [...listNotes, newNote]
    setListNotes(updatedListNotes)
    setSizeOccupiedByLocalStorage(calculateLocalStorageSize(updatedListNotes))
  }
}

/**
 * Centraliza notas em uma área visível da janela do navegador, ajustando suas posições para ficarem organizadas em colunas.
 *
 * @param {function} setIsCentralizing - Função para definir o estado de centralização.
 * @param {Array<Object>} listNotes - Lista de notas a serem centralizadas.
 * @param {function} setListNotes - Função para definir a lista de notas atualizada com novas posições.
 * @returns {function} - Função que, quando chamada, executa o processo de centralização das notas.
 */
export const centralizeNotes = (setIsCentralizing, listNotes, setListNotes) => {
  return () => {
    if (listNotes.length === 0) return

    setIsCentralizing(true)

    const noteHeight = 200
    const noteWidth = 185
    const initialY = 70

    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    const totalNotes = listNotes.length

    const maxColumns = Math.floor(windowWidth / noteWidth)
    const maxNotesPerColumn = Math.ceil(totalNotes / maxColumns)
    const spacingY =
      (windowHeight - noteHeight) / Math.max(maxNotesPerColumn - 1, 1)
    const columns = Math.ceil(totalNotes / maxNotesPerColumn)
    const spacingX = (windowWidth - columns * noteWidth) / (columns + 1)

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
      setIsCentralizing(false)
    }, 500)
  }
}
