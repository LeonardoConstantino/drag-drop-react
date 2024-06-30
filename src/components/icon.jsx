import PropTypes from 'prop-types'
import { getContrastColor } from '../utils/helpers.js'

/**
 * Componente de ícone.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.iconUrl - URL da imagem de ícone.
 * @param {string} props.className - Classe CSS para estilização do ícone.
 * @param {string} props.noteColor - Cor associada ao ícone.
 * @returns {JSX.Element} - Elemento de ícone renderizado com a imagem e estilos aplicados.
 *
 * @example
 * // Exemplo de uso:
 * <Icon
 *   iconUrl="/path/to/icon.png"
 *   className="icon-class"
 *   noteColor="#ff0000"
 * />
 */
export const Icon = ({ iconUrl, className = '', backgroundColor = '' }) => {
  return (
    <i
      className={className}
      style={{
        backgroundImage: `url("${iconUrl}")`,
        '--shadow-color': backgroundColor && getContrastColor(backgroundColor),
      }}
    ></i>
  )
}

Icon.propTypes = {
  iconUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
}
