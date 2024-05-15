import React from 'react'

type CardButtonProps = {
  type?: 'submit' | 'button'
  className: string
  color?: string
  children: React.ReactNode
  onClick?: () => void
}

const CardButton: React.FC<CardButtonProps> = ({
  type,
  className,
  color,
  children,
  onClick,
}) => {
  return (
    <button className={`${className} text-${color} `} onClick={onClick}>
      {children}
    </button>
  )
}

export default CardButton
