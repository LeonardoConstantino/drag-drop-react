import { Icon } from './icon'

/**
 * Componente de botão com ícone.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {function} props.handle - Função de callback para lidar com o clique no botão.
 * @param {Array} props.args - Argumentos para passar para a função de callback.
 * @param {string} props.className - Classe CSS para estilização do botão.
 * @param {string} props.icon - URL do ícone a ser exibido no botão.
 * @param {string} props.noteColor - Cor relacionada ao botão.
 * @returns {JSX.Element} - Elemento de botão renderizado com um ícone.
 *
 * @example
 * // Exemplo de uso:
 * const handleClick = (arg1, arg2, e) => {
 *   // Lógica para lidar com o clique no botão
 * };
 *
 * <Button
 *   handle={handleClick}
 *   arg={['arg1', 'arg2']}
 *   className="custom-button"
 *   icon="/path/to/icon.png"
 *   noteColor="#ff0000"
 * />
 */
export const Button = ({ handle, args, className, icon, noteColor }) => {
  const handleOnClick = (e) => handle(...args, e)
  return (
    <button className={className} onClick={handleOnClick}>
      <Icon iconUrl={icon} className={className} backgroundColor={noteColor} />
    </button>
  )
}