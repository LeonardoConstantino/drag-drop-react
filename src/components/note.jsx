import PropTypes from 'prop-types'
import { storageUtil } from '../utils/storageUtil.js'
import { STORAGE_KEY } from '../utils/constants.js'
import { Button } from './button.jsx'
import { TextareaResize } from '../services/handleTextarea.js'
import remove from '../assets/images/remove.svg'
import upLayer from '../assets/images/upLayer.svg'
import downLayer from '../assets/images/downLayer.svg'

storageUtil.setAppPrefix(STORAGE_KEY)

const handleTextareaResize = TextareaResize()

/**
 * Componente de nota interativa.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {Object} props.note - Objeto representando os dados da nota.
 * @param {function} props.removeItem - Função para remover a nota.
 * @param {boolean} props.isCentralizing - Indica se a nota está centralizando.
 * @param {function} props.handleStartInteraction - Função para lidar com o evento mousedown na nota.
 * @param {function} props.handleMoveInteraction - Função para lidar com o evento mousemove na nota.
 * @param {function} props.handleEndInteraction - Função para lidar com o evento mouseup na nota.
 * @param {function} props.salveInputContent - Função para salvar o conteúdo de um campo de entrada na nota.
 * @param {function} props.handleMoveLayerUp - Função para mover a nota para cima na camada.
 * @param {function} props.handleMoveLayerdown - Função para mover a nota para baixo na camada.
 * @returns {JSX.Element} - Elemento de nota renderizado com botões de controle e área de texto.
 */
export const Note = ({
  note,
  removeItem,
  isDragging,
  isCentralizing,
  handleInputContent,
  handleStartInteraction,
  handleMoveInteraction,
  handleEndInteraction,
  handleMoveLayerUp,
  handleMoveLayerdown,
}) => {
  const handleTextAreaInput = (e) => {
    handleTextareaResize(e)
    handleInputContent(e, note.id)
  }

  const style = {
    top: note.top + 'px',
    left: note.left + 'px',
    zIndex: note.zIndex,
  }

  const noteClass = [
    'note',
    isCentralizing && 'centralize',
    isDragging && 'user-select-none',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={noteClass} style={style}>
      <div
        className="control"
        style={{ backgroundColor: note.color, cursor: note.cursor }}
        onMouseDown={(e) => handleStartInteraction(e, note.id)}
        onTouchStart={(e) => handleStartInteraction(e, note.id)}
        onMouseMove={(e) => handleMoveInteraction(e, note.id)}
        onTouchMove={(e) => handleMoveInteraction(e, note.id)}
        onMouseUp={handleEndInteraction}
        onTouchEnd={handleEndInteraction}
      >
        <Button
          handle={handleMoveLayerUp}
          args={[note.id]}
          icon={upLayer}
          className={'layer'}
          noteColor={note.color}
          ariaLabel="Move layer up"
        />

        <Button
          handle={handleMoveLayerdown}
          args={[note.id]}
          icon={downLayer}
          className={'layer'}
          noteColor={note.color}
          ariaLabel="Move layer down"
        />

        <Button
          handle={removeItem}
          args={[note.id]}
          icon={remove}
          className={'close'}
          noteColor={note.color}
          ariaLabel="Remove note"
        />
      </div>
      <label htmlFor={`note-${note.id}`} className="sr-only">
        Note content
      </label>
      <textarea
        id={`note-${note.id}`}
        placeholder="Escreva algo..."
        cols="20"
        onInput={handleTextAreaInput}
        defaultValue={note.contente}
        aria-label="Note content"
      ></textarea>
    </div>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    zIndex: PropTypes.number,
    color: PropTypes.string.isRequired,
    cursor: PropTypes.string,
    contente: PropTypes.string,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  isCentralizing: PropTypes.bool,
  handleInputContent: PropTypes.func.isRequired,
  handleStartInteraction: PropTypes.func.isRequired,
  handleMoveInteraction: PropTypes.func.isRequired,
  handleEndInteraction: PropTypes.func.isRequired,
  handleMoveLayerUp: PropTypes.func.isRequired,
  handleMoveLayerdown: PropTypes.func.isRequired,
};