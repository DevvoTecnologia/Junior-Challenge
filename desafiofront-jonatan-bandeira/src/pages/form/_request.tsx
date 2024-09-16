import axios from "axios";

const postRing = (formData: any) => {
    return axios.post('http://localhost:5000/api/rings', formData)
      .then(response => response.data)
      .catch(error => console.error('Error creating ring:', error));
}

const getRing = (id: number) => {
    return axios.get(`http://localhost:5000/api/rings/${id}`)
      .then(response => response.data)
      .catch(error => console.error('Error creating ring:', error));
}

const deleteRing = (id: number) => {
    return axios.delete(`http://localhost:5000/api/rings/${id}`)
      .then(response => response.data)
      .catch(error => console.error('Error creating ring:', error));
}

export {postRing, getRing, deleteRing}