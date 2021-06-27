import "../styles/question.scss"
import { ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme'

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
  const { theme } = useTheme()
  
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