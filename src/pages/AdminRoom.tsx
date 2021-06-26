import logoImg from "../assets/images/logo2.png"
import { Button } from "../components/Button"
import '../styles/room.scss'
import { RoomCode } from "../components/RoomCode"
import { useHistory, useParams } from "react-router-dom"
import { Question } from "../components/Question"
import { useRoom } from "../hooks/useRoom"
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import { database } from '../services/firebase'
import { useState } from "react"
import Modal from '@material-ui/core/Modal';
import '../styles/modal.scss'
import { useTheme } from '../hooks/useTheme'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { questions, title } = useRoom(roomId)
  const [open, setOpen] = useState<boolean>(false)
  const { theme } = useTheme()

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <div id="page-room" className={theme}>
      <header className={theme}>
        <div className='content'>
          <img src={logoImg} alt="Rocket" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className='content'>
        <div className='room-title'>
          <h1 className={theme}>Sala {title}</h1>
          {questions.length > 0 && <span className={theme}>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt='Marcar pergunta como respondida' />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt='Dar destaque à pergunta' />
                    </button>
                  </>
                )}
                <button
                  type='button'
                  onClick={handleOpen}
                >
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div className='modal'>
                    <div className="title-style">
                      <h2 className="simple-modal-title">Tem certeza que deseja excluir esta pergunta?</h2>
                    </div>
                    <div className='content-button'>
                      <button className='button-accept' onClick={
                        () => {
                          handleDeleteQuestion(question.id)
                          handleClose()
                        }}>
                        <div className='check-yes'>
                          <i className="fas fa-check"></i>
                        </div>
                        <p>Sim</p>
                      </button>
                      <button className='button-delete' onClick={handleClose}>
                        <div className='check-no'>
                          <i className="fas fa-times"></i>
                        </div>
                        <p>Não</p>
                      </button>
                    </div>
                  </div>
                </Modal>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}