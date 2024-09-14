import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 400 }}>
        <Typography variant="h6" component="h2">
          Confirmar Exclusão
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Você tem certeza que deseja deletar este anel? Essa ação não pode ser
          desfeita.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Deletar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default ConfirmDeleteModal;
