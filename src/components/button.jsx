import { Icon } from './icon';

export const Button = ({ handle, arg, className, icon, noteColor }) => {
  const onClickHandle = (e) => handle(...arg, e)
  return (
    <button className={className} onClick={onClickHandle}>
      <Icon 
        iconUrl={icon} 
        className={className} 
        noteColor={noteColor} 
      />
    </button>
  )
}