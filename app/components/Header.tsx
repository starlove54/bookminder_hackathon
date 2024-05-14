import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="flex flex-col text-center items-center justify-center bg-gray-900 text-white py-16 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          BookMinder: Note taking for every story lover❤️
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-center">
          Finish that story with bookminder by your side
        </p>
      </header>
    </div>
  )
}

export default Header
