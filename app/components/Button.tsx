import React from 'react'

type ButtonProps = {
  type?: 'button' | 'submit'
  border?: string
  size: string
  color?: string
  className: string
  variant: string
  children: React.ReactNode // Include children prop
}

const Button = ({
  type,
  className,
  color,
  size,
  variant,
  children,
}: ButtonProps) => {
  return (
    <button className={`${className} ${size} ${color} ${variant}`}>
      {children}
    </button>
  )
}

export default Button
