// src/components/RingModal.tsx
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

interface RingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  ring: any;
  setRing: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
}

const forgedByOptions = ['Elfos', 'Anões', 'Homens', 'Sauron'];

const RingModal: React.FC<RingModalProps> = ({
  open,
  onClose,
  onSubmit,
  ring,
  setRing,
  isEditing,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 400 }}>
        <Typography variant="h6" component="h2">
          {isEditing ? 'Editar Anel' : 'Criar Anel'}
        </Typography>
        <TextField
          fullWidth
          label="Nome do Anel"
          name="name"
          value={ring?.name || ''}
          onChange={(e) => setRing({ ...ring, name: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Poder"
          name="power"
          value={ring?.power || ''}
          onChange={(e) => setRing({ ...ring, power: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Portador"
          name="bearer"
          value={ring?.bearer || ''}
          onChange={(e) => setRing({ ...ring, bearer: e.target.value })}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Forjado Por</InputLabel>
          <Select
            value={ring?.forgedBy || ''}
            onChange={(e) => setRing({ ...ring, forgedBy: e.target.value })}
            label="Forjado Por"
          >
            {forgedByOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="URL da Imagem (Opcional)"
          name="image"
          value={ring?.image || ''}
          onChange={(e) => setRing({ ...ring, image: e.target.value })}
          margin="normal"
          placeholder="https://exemplo.com/imagem.png"
        />
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {isEditing ? 'Atualizar' : 'Criar'}
        </Button>
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

export default RingModal;
