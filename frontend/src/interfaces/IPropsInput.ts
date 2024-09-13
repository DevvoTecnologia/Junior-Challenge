export interface IPropsInput {
  size?: 'small' | 'medium'
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  type: string
  isSelect?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Array<any>
  maxLength?: number
}
