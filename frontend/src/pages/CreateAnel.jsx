import React from 'react';
import Form from '../components/Form';
import styles from '../components/css/CreateAnel.module.css';

const CreateAnel = () => {
  return (
    <div className={'row'}>
      <div className="col-12 col-lg-9 mx-auto">
        <h2 className="text-center">Criando anél</h2>
        <Form />
      </div>
    </div>
  );
};

export default CreateAnel;
