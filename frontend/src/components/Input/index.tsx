import React from 'react'
import { FormControl, TextField, TextFieldProps } from '@mui/material'
import colors from '../../styles/colors'

interface InputProps extends Omit<TextFieldProps, 'label'> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, sx, ...props }, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTextField = (inputProps: any) => (
    <TextField
      ref={ref}
      placeholder={props.placeholder}
      size='small'
      sx={{
        flex: '1',
        margin: '5px',
        borderRadius: '8px',
        backgroundColor: colors?.white,
        fontSize: '18px'
        // width: '400px'
      }}
      {...inputProps}
      {...props}
    />
  )

  return (
    <FormControl fullWidth sx={sx}>
      {label && <label>{label}</label>}
      {renderTextField({})}
    </FormControl>
  )
})

Input.displayName = 'Input'

export default Input
