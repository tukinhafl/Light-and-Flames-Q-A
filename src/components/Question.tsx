import "../styles/question.scss"
import { ReactNode } from 'react'
// import { database } from "../services/firebase"
// import { useParams } from "react-router-dom"
// import { useRoom } from "../hooks/useRoom"

// type RoomParams = {
//   id: string;
// }

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  // isOnFire?: boolean;
}

export function Question({content, author, isAnswered = false , isHighlighted = false, children}: QuestionProps) {
  // const params = useParams<RoomParams>()
  // const roomId = params.id
  // const { questions } = useRoom(roomId)

  // function checkLikesAmount() {
  //   for (let i = 0; i < questions.length; i++) {
  //     if (questions[i].likeCount > 5) {

  //     }
  //   }
  // }

  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted && !isAnswered ? 'highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}