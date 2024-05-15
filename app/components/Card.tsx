import React from 'react'
import CardButton from './CardButton'

type CardProps = {
  characterCardKey: string
  bookId: string
  title: string
  description: string
  onDelete: (bookId: string, characterCardKey: string) => void
}

const Card: React.FC<CardProps> = ({
  characterCardKey,
  bookId,
  title,
  description,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(bookId, characterCardKey)
  }

  const handleEdit = () => {}

  return (
    <div className="bg-white shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-950">
      <div className="card-content px-4 py-4 shadow-md">
        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-50">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <CardButton
            type="button"
            className=" hover:bg-slate-200   rounded-full  
            text-slate-500 text-sm  px-5 py-2 border-2 transition-transform transform hover:scale-105"
            onClick={handleEdit}
          >
            Edit
          </CardButton>
          <CardButton
            className="hover:bg-red-400 rounded-full px-5 py-2 text-white bg-red-500 text-sm transition-transform transform hover:scale-105"
            onClick={handleDelete}
          >
            Delete
          </CardButton>
        </div>
      </div>
    </div>
  )
}

export default Card
