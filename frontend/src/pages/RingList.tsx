import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { getRings, deleteRing, createRing, updateRing } from '../services/api';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import Slider from 'react-slick';
import RingModal from '../components/RingModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import toast from 'react-hot-toast';

import { getToken } from '../services/auth';

import defaultRing1 from '../assets/images/defaultRing1.png';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const RingList: React.FC = () => {
  const [rings, setRings] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRing, setSelectedRing] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRings = async () => {
      const token = getToken();
      if (!token) {
        toast.error('Você precisa estar logado para acessar esta página');
        navigate('/login');
        return;
      }

      try {
        const response = await getRings(token);
        setRings(response.data);
      } catch (error) {
        toast.error('Erro ao carregar os anéis');
      }
    };

    fetchRings();
  }, [navigate]);

  const handleOpen = (ring?: any) => {
    setSelectedRing(
      ring || { name: '', power: '', bearer: '', forgedBy: '', image: '' }
    );
    setIsEditing(!!ring);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRing(null);
  };

  const handleDeleteOpen = (ring: any) => {
    setSelectedRing(ring);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedRing(null);
  };

  const handleDeleteConfirm = async () => {
    const token = getToken();
    if (!token) {
      toast.error('Você precisa estar logado para realizar essa ação');
      return;
    }

    try {
      await deleteRing(selectedRing.id, token);
      setRings(rings.filter((ring) => ring.id !== selectedRing.id));
      toast.success('Anel excluído com sucesso!');
      handleDeleteClose();
    } catch (error) {
      toast.error('Erro ao excluir o anel.');
    }
  };

  const handleSubmit = async () => {
    const token = getToken();
    if (!token) {
      toast.error('Você precisa estar logado para realizar essa ação');
      return;
    }

    try {
      if (!selectedRing.image) {
        selectedRing.image = defaultRing1;
      }

      if (isEditing) {
        await updateRing(selectedRing.id, selectedRing, token);
        toast.success('Anel atualizado com sucesso!');
      } else {
        await createRing(selectedRing, token);
        toast.success('Anel criado com sucesso!');
      }
      setOpen(false);
      const response = await getRings(token);
      setRings(response.data);
    } catch (error) {
      toast.error('Erro ao processar o anel.');
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box sx={{ paddingTop: '20px' }}>
        {rings.length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ marginBottom: '20px' }}
          >
            Nenhum anel foi forjado ainda... Que tal criar o primeiro anel e se
            tornar o Senhor dos Anéis?
          </Typography>
        ) : (
          <Slider {...settings}>
            {rings.map((ring) => (
              <div key={ring.id} style={{ padding: '0 10px' }}>
                <Card sx={{ margin: '10px', padding: '15px' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={ring.image || defaultRing1}
                    alt={ring.name}
                  />
                  <CardContent>
                    <Typography variant="h5">{ring.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ring.power}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Portador: {ring.bearer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Forjado por: {ring.forgedBy}
                    </Typography>
                    <IconButton onClick={() => handleOpen(ring)}>
                      <FaEdit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteOpen(ring)}>
                      <FaTrashAlt color="red" />
                    </IconButton>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        )}
      </Box>

      <Box sx={{ marginTop: '50px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          startIcon={<FaPlusCircle />}
        >
          Adicionar Anel
        </Button>
      </Box>

      <RingModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        ring={selectedRing}
        setRing={setSelectedRing}
        isEditing={isEditing}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default RingList;
