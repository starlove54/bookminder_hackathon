import React from 'react'

const Button = ({
  className = '',
  color = 'gray',
  size = 'md',
  variant = 'solid',
  // onClick,
  // children,
}) => {
  return (
    <button
      className={`${className} ${color} ${size} ${variant}`}
      // onClick={onClick}
    ></button>
  )
}

export default Button
