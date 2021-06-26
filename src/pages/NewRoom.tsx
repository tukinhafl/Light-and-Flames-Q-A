import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo2.png'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { useTheme } from '../hooks/useTheme'

export function NewRoom() {

  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')
  const { theme } = useTheme()


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()
    
    if(newRoom.trim() === '') {
      return;
    }
    
    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }
 
  return (
    <div id='page-auth' className={theme}>
      <aside className={theme}>
        <img src={illustrationImg} className={theme} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo!</strong>
        <p>Tire as duvidas da sua audiencia em tempo real.</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Rocket" />
          <h2 className={theme}>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>
              Criar sala.
            </Button>
          </form>
          <p className={theme}>
            Quer entrar em uma sala existente? <Link to="/" className={theme}>clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}