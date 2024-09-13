import * as React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { DialogTitle, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ContentHeader } from './styled'
import colors from '../../styles/colors'
interface ModalDialogProps {
  title?: string
  open: boolean
  setOpen: React.Dispatch<boolean>
  children: JSX.Element
  hasCloseButton?: boolean
  hasSubmitButton?: boolean
  nameButtonClose?: string
  nameButtonSubmit?: string
  closeIcon?: boolean
  responsiveHeight?: string
  disabledBackDrop?: boolean
  width?: string
  isFullScreen?: boolean
  maxWidth?: string
  height?: string
  backgroundColor?: string
  overflowY?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
  subTitle?: JSX.Element
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  title,
  open,
  nameButtonClose,
  nameButtonSubmit,
  hasSubmitButton,
  setOpen,
  children,
  hasCloseButton = false,
  closeIcon,
  responsiveHeight = '80vh',
  disabledBackDrop = false,
  width,
  maxWidth,
  height,
  isFullScreen = false,
  backgroundColor,
  overflowY = 'auto',
  subTitle
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCloseBackDrop = (event: any, reason: string) => {
    if (!disabledBackDrop) {
      return setOpen(false)
    }
    if (reason !== 'backdropClick') {
      return setOpen(false)
    }
  }

  const handleCloseButton = () => setOpen(false)

  return (
    <div>
      <Dialog
        disableEscapeKeyDown={disabledBackDrop}
        PaperProps={{
          style: {
            borderRadius: '8px',
            width: width ?? 'auto',
            maxWidth: maxWidth ?? 'auto',
            height: height ?? 'auto',
            background: backgroundColor ?? colors.white,
            overflowY: overflowY ?? 'auto'
          }
        }}
        sx={{
          '@media (max-width: 600px)': {
            width: '95%',
            margin: '0px auto',
            height: responsiveHeight
          },

          '@media (max-width: 478px)': {
            width: '100%'
          }
        }}
        fullScreen={fullScreen || isFullScreen}
        open={open}
        onClose={handleCloseBackDrop}
        aria-labelledby='responsive-dialog-title'
      >
        <ContentHeader>
          {title && (
            <DialogTitle
              sx={{
                fontWeight: '700',
                fontSize: '18px',

                '@media (max-width: 420px)': {
                  fontSize: '16px',
                  wordBreak: 'break-all',
                  maxWidth: '95%'
                }
              }}
              id='responsive-dialog-title'
            >
              {title}
            </DialogTitle>
          )}
          {closeIcon && (
            <IconButton onClick={handleCloseButton}>
              <HighlightOffIcon />
            </IconButton>
          )}
        </ContentHeader>
        {subTitle && <>{subTitle}</>}

        <DialogContent
          sx={{
            '@media (max-width: 478px)': {
              padding: '30px 20px'
            }
          }}
        >
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            margin: hasCloseButton ? '1rem auto 2rem' : '0',
            backgroundColor: hasCloseButton ? colors?.red : '',
            color: colors?.white,
            borderRadius: '0.5rem',
            width: '90%'
          }}
        >
          {hasCloseButton && (
            <Button
              sx={{
                margin: 'auto',
                color: colors?.white,
                fontSize: '1rem'
              }}
              autoFocus
              type='button'
              onClick={handleCloseButton}
            >
              {nameButtonClose}
            </Button>
          )}

          {hasSubmitButton && (
            <Button
              autoFocus
              type='submit'
              sx={{
                backgroundColor: hasCloseButton ? colors?.red : '',
                color: colors?.white
              }}
            >
              {nameButtonSubmit}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalDialog
