import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="flex flex-col text-center items-center justify-center bg-gray-900 text-white py-16 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          BookMinder: note taking app for stories
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-center">
          Finish your story by keeping what matters the most in one place.
        </p>
      </header>
    </div>
  )
}

export default Header
