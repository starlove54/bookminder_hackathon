import React from 'react'

type ButtonProps = {
  type?: 'submit' | 'button'
  className: string
  color?: string
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  color,
  children,
}) => {
  return <button className={`${className} text-${color} `}>{children}</button>
}

export default Button
