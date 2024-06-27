import { storageUtil } from '../utils/storageUtil.js'
import { STORAGE_KEY } from '../utils/constants.js'
import { Button } from './button.jsx'
import remove from '../assets/images/remove.svg'
import upLayer from '../assets/images/upLayer.svg'
import downLayer from '../assets/images/downLayer.svg'

storageUtil.setAppPrefix(STORAGE_KEY)

const autoResizeTextarea = (e) => {
  const textarea = e.target
  const maxHeight = 200
  const getNewHeight = (scrollHeight) => Math.min(scrollHeight, maxHeight)
  textarea.style.height = 'auto'
  textarea.style.height = `${getNewHeight(textarea.scrollHeight)}px`
}

export const Note = ({
  note,
  removeItem,
  centralizing,
  handleMousedown,
  handleMousemove,
  handleMouseup,
  salveInputContent,
  handleMoveLayerUp,
  handleMoveLayerdown,
}) => {
  const handleTextAreaInput = (e) => {
    autoResizeTextarea(e)
    salveInputContent(e, note.id)
  }
  
  const style = {
    top: note.top + 'px',
    left: note.left + 'px',
    cursor: note.cursor,
    zIndex: note.zIndex,
  }

  return (
    <div
      className={centralizing ? `note centralize` : 'note'}
      style={style}
    >
      <div
        className="control"
        style={{ backgroundColor: note.color }}
        onMouseDown={(e) => handleMousedown(e, note.id)}
        onMouseMove={(e) => handleMousemove(e, note.id)}
        onMouseUp={handleMouseup}
      >
        <Button
          handle={handleMoveLayerUp}
          arg={[note.id]}
          icon={upLayer}
          className={'layer'}
          noteColor={note.color}
        />

        <Button
          handle={handleMoveLayerdown}
          arg={[note.id]}
          icon={downLayer}
          className={'layer'}
          noteColor={note.color}
        />

        <Button
          handle={removeItem}
          arg={[note.id]}
          icon={remove}
          className={'close'}
          noteColor={note.color}
        />
      </div>
      <label for="note"></label>
      <textarea
        id='note'
        placeholder="Escreva algo..."
        cols="20"
        onInput={handleTextAreaInput}
        defaultValue={note.contente}
      ></textarea>
    </div>
  )
}
