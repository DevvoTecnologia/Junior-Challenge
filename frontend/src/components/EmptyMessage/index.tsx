import React from 'react'
import { Nocontent } from './styles'

interface IProps {
  message: string
}

const EmptyMessage = ({ message }: IProps) => {
  return <Nocontent>{message}</Nocontent>
}

export default EmptyMessage
