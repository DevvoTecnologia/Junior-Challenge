import axios from "axios";

const getRings = () => {
    return axios.get('http://localhost:5000/api/rings')
      .then(response => response.data)
      .catch(error => console.error('Error fetching rings:', error));
}

const deleteRing = (id: number) => {
    axios.delete(`http://localhost:5000/api/rings/${id}`)
      .then(() => console.log(`apagado`))
      .catch(error => console.error('Error deleting ring:', error));
}

export {getRings}