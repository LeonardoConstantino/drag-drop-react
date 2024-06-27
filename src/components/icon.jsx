import { getContrastColor } from './../utils/helpers';

export const Icon = ({ iconUrl, className, noteColor }) => {
  return (
    <i
      className={className}
      style={{ 
        backgroundImage: `url("${iconUrl}")`,
        '--shadow-color': noteColor && getContrastColor(noteColor)
      }}
    ></i>
  )
}
