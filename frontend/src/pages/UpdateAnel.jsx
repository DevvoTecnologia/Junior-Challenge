import React from 'react';
import Form from '../components/Form';
import { useParams } from 'react-router-dom';

const UpdateAnel = () => {
  const { id } = useParams();

  return (
    <div className={'row'}>
      <div className="col-12 col-lg-9 mx-auto">
        <h2 className="text-center">Atualizando anél</h2>
        <Form id={id} />
      </div>
    </div>
  );
};

export default UpdateAnel;
