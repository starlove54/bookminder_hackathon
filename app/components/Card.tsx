import React from 'react'
import Button from './Button'

interface CardProps {
  imageUrl: string
  title: string
  description: string
}

const Card = ({ imageUrl, title, description }) => {
  return (
    <div className="bg-white shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-950">
      <div className="card-header">
        <img
          alt="Character Image"
          className="aspect-square rounded-md object-cover"
          height="80"
          src={imageUrl}
          width="80"
        />
      </div>
      <div className="card-content">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Button
            className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            size="sm"
            variant="outline"
          >
            Edit
          </Button>
          <Button
            className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            color="red"
            size="sm"
            variant="outline"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Card
