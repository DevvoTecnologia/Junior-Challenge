import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

export const createAnel = async (data, setAlert) => {
  try {
    const response = await axios.post(`${API_URL}/anel/criar`, data, {});
    return response;
  } catch (error) {
    console.log(error);
    if (error.response.status === 500)
      setAlert(
        'Límite de anéis forjado por essa etnia atingido. Escolha outra etnia.',
      );
  }
};

export const getAneis = async () => {
  try {
    const response = await axios.get(`${API_URL}/anel/listar`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Falha ao retornar os aneis');
  }
};

export const getAnelById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/anel/details/${id}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Falha ao retornar detalhes do anél');
  }
};

export const updateAnel = async (data, id, setAlert) => {
  try {
    const response = await axios.put(
      `${API_URL}/anel/atualizar/${id}`,
      data,
      {},
    );

    return response;
  } catch (error) {
    console.log(error);
    if (error.response.status === 500)
      setAlert(
        'Límite de anéis forjado por essa etnia atingido. Escolha outra etnia.',
      );
  }
};

export const deleteAnel = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/anel/deletar/${id}`, {});

    return response;
  } catch (error) {
    console.log(error);
  }
};
