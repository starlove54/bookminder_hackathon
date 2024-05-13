import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="flex flex-col text-center items-center justify-center bg-gray-900 text-white py-16 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          BookMinder: Your Key to Finishing Every Story
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-center">
          Don't let that story remain unfinished - have BookMinder by your side
          every step of the way.
        </p>
      </header>
    </div>
  )
}

export default Header
