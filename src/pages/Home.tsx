import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo2.png'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { useTheme } from '../hooks/useTheme'

export function Home() {
  const history = useHistory();

  const { theme, toggleTheme } = useTheme()

  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does net exist.')
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room alredy closed.')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id='page-auth' className={theme}>
      <aside className={theme}>
        <img src={illustrationImg} className={theme} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo!</strong>
        <p>Tire as duvidas da sua audiencia em tempo real.</p>
      </aside>
      <main>
        <button onClick={toggleTheme} className={`change-theme ${theme}`}>
          <i className={`fas fa-burn ${theme}`}></i>
        {theme}</button>
        <div className='main-content'>
          <img src={logoImg} alt="Rocket" />
          <button onClick={handleCreateRoom} className={`createRoom ${theme}`}>
            <img src={googleIconImg} alt="" />
            Crie sua sala com o Google.
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event?.target.value)}
              value={roomCode}
            />
            <Button type='submit'>
              Entrar na sala.
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}