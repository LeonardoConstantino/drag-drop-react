import { useNotes } from './hooks/useNotes.js'
import { Note } from './components/note.jsx'
import { Icon } from './components/icon'
import Plus from './assets/images/Plus.svg'
import center from './assets/images/HorizontalAlignCenter.svg'

export const App = () => {
  const {
    color,
    isDragging,
    isCentralizing,
    sizeOccupiedByLocalStorage,
    listNotes,
    handleClickButtonPlus,
    handleColorChange,
    removeNote,
    handleInputContent,
    handleMoveLayerUp,
    handleMoveLayerdown,
    handleCentralize,
    handleStartInteraction,
    handleMoveInteraction,
    handleEndInteraction,
  } = useNotes()

  return (
    <main
      onMouseMove={isDragging ? handleMoveInteraction : null}
      onMouseUp={isDragging ? handleEndInteraction : null}
    >
      <form name="add">
        <div className="add">
          <label htmlFor="color" className="sr-only">
            Escolher cor
          </label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={handleColorChange}
            aria-label="Selecionar cor da nota"
          />
          <button type="button" onClick={handleClickButtonPlus}>
            <Icon iconUrl={Plus} className="Plus" aria-label="Adicionar nota" />
          </button>
        </div>
        <button
          className="btn-Centralize"
          type="button"
          onClick={handleCentralize}
          aria-label="Centralizar notas"
        >
          <Icon iconUrl={center} />
        </button>
        <p className="info">
          <span>~{sizeOccupiedByLocalStorage}</span> / ~5 MB
        </p>
      </form>
      <div id="list">
        {listNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            isCentralizing={isCentralizing}
            removeItem={removeNote}
            isDragging={isDragging}
            handleInputContent={handleInputContent}
            handleStartInteraction={handleStartInteraction}
            handleMoveInteraction={handleMoveInteraction}
            handleEndInteraction={handleEndInteraction}
            handleMoveLayerUp={handleMoveLayerUp}
            handleMoveLayerdown={handleMoveLayerdown}
          />
        ))}
      </div>
    </main>
  )
}
