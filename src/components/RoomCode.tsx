import copyImg from "../assets/images/copy.svg"
import "../styles/room-code.scss"
import { useTheme } from '../hooks/useTheme'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const { theme } = useTheme()

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className={`room-code ${theme === 'light' ? 'light' : 'flames'}`} onClick={copyRoomCodeToClipboard}>
      <div className={theme}>
        <img src={copyImg} alt="copy room code" />
      </div>
      <span className={theme}>Sala #{props.code}</span>
    </button>
  )
}