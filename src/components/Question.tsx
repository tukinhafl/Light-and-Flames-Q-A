import "../styles/question.scss"
import { ReactNode } from 'react'
// import { useParams } from "react-router-dom"
// import { useRoom } from "../hooks/useRoom"
import { useTheme } from '../hooks/useTheme'

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
}

export function Question({content, author, isAnswered = false , isHighlighted = false, children}: QuestionProps) {
  // const params = useParams<RoomParams>()
  // const roomId = params.id
  // const { questions } = useRoom(roomId)
  const { theme } = useTheme()
  
  // function checkLikesAmount() {
  //   for (let i = 0; i < questions.length; i++) {
  //     if (questions[i].likeCount > 0) {
  //       return true     
  //     } 
  //   }
  //   return false
  // }

  return (
    <div className={`question ${theme === 'light' ? 'light' : 'flames'} ${isAnswered ? 'answered' : ''} ${isHighlighted && !isAnswered ? 'highlighted' : ''}`}>
      <p className={theme}>{content}</p>
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