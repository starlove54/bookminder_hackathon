import React from 'react'

type CardButtonProps = {
  type?: 'submit' | 'button'
  className: string
  color?: string
  children: React.ReactNode
}

const CardButton: React.FC<CardButtonProps> = ({
  type,
  className,
  color,
  children,
}) => {
  return <button className={`${className} text-${color} `}>{children}</button>
}

export default CardButton
