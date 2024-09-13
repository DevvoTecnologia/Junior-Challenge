import React, { ReactNode, MouseEvent } from 'react'
import colors from '../../styles/colors'
import { Button, ButtonProps } from '@mui/material'

interface Props extends ButtonProps {
  handleSubmit?: () => void
  loading?: boolean
  disabled?: boolean
  height?: string
  typeButton?: 'primary' | 'secondary' | 'outline' | 'link'
  children?: ReactNode
  type?: 'button' | 'submit'
  width?: string
  maxWidth?: string
  isDanger?: boolean
}

const Buttons = ({
  handleSubmit,
  loading,
  disabled,
  height = '40px',
  typeButton = 'primary',
  children,
  type = 'button',
  width = 'auto',
  maxWidth = 'none',
  isDanger = false,
  ...props
}: Props): JSX.Element => {
  const optionsType = {
    primary: {
      color: colors?.white,
      background: isDanger ? colors.red : colors?.blue
    },
    outline: {
      color: colors?.blue,
      background: 'transparent'
    }
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (handleSubmit) {
      handleSubmit()
    }
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <Button
      sx={{
        height,
        width,
        maxWidth,
        fontWeight: 700,
        padding: '0 2rem',
        textTransform: 'none',
        color: optionsType[typeButton].color,
        background: optionsType[typeButton].background,
        transition: '0.3s',
        border: typeButton === 'outline' ? `1px solid ${colors?.blue}` : 'none',

        '&:hover': {
          border: typeButton === 'outline' ? `1px solid ${colors?.blue}` : 'none',
          color: typeButton === 'outline' ? colors?.white : optionsType[typeButton].color,
          background: typeButton === 'outline' ? colors?.blue : optionsType[typeButton].background,
          filter: 'brightness(0.8)'
        },

        '&:disabled': {
          backgroundColor: colors?.disabled
        }
      }}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Button>
  )
}

export default Buttons
