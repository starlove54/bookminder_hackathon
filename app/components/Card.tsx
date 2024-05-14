import React from 'react'
import CardButton from './CardButton'
import Image from 'next/image'

// interface CardProps {
//   imageUrl: string
//   title: string
//   description: string
// }

type CardProps = {
  title: string
  description: string
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-950">
      {/* <div className="card-header">
        <Image
          alt="Character Image"
          className="aspect-square rounded-md object-cover"
          height="80"
          src={imageUrl}
          width="80"
        />
      </div> */}
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
          >
            Edit
          </CardButton>
          <CardButton className="hover:bg-red-400 rounded-full px-5 py-2 text-white bg-red-500 text-sm transition-transform transform hover:scale-105">
            Delete
          </CardButton>
        </div>
      </div>
    </div>
  )
}

export default Card
