import React from 'react'

const Header = () => {
  return (
    <div>
      <header className="flex flex-col text-center items-center justify-center bg-gray-900 text-white py-10 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">BookMinder</h1>
        <p className="text-sm md:text-lg mb-8 font-regular max-w-2xl text-center">
          Keep what matters the most in one place.
        </p>
      </header>
    </div>
  )
}

export default Header
