import React from 'react'
import Button from './Button'
import Image from 'next/image'

// interface CardProps {
//   imageUrl: string
//   title: string
//   description: string
// }

type CardProps = {
  title?: string
  desciption?: string
}

const Card = ({ title, description }) => {
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            className="text-gray-500 hover:bg-gray-100  border-gray-500 dark:text-gray-400 rounded-full dark:hover:bg-gray-800 
            text-slate-500  px-5 py-2 border-2 border-solid"
          >
            Edit
          </Button>
          <Button
            className=" hover:bg-gray-100 dark:text-gray-400 rounded-full dark:hover:bg-gray-800 px-5 py-2 
            text-white bg-red-500 border-none text-md"
            color="red"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Card
