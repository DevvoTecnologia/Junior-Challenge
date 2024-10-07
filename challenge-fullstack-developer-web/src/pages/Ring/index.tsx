import { useState } from 'react';
import { useStore } from '../../hooks/useStores';
import { notification } from 'antd';
import { FiX } from 'react-icons/fi';
import _get from 'lodash/get';
import RingModule from '../../modules/RingModule';
import { history } from '../../helpers/history';
import { ROUTES } from '../../routes';

const Ring = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { general } = useStore();
  const { createRing } = general;

  const handleCreateNewRing = async (body: any) => {
    setLoading(true);

    const response = await createRing(body);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      handleBackHome();
      setLoading(false);
      notification.success({
        message: "Deu tudo certo!",
        description: "O item foi criado com sucesso.",
        placement: "bottom",
        duration: 4,
        closeIcon: <FiX className="i-24 white" />
      });
    } else {
      notification.error({
        message: "Houve um problema",
        description: response.message,
        placement: "bottom",
        duration: 4,
        closeIcon: <FiX className="i-24 white" />
      });
      setLoading(false);
    };
  };

  const handleBackHome = () => {
    history.navigate(ROUTES.HOME);
  };

  return (
    <div className="container">
      <div className="content">
        <RingModule
          loading={loading}
          setLoading={setLoading}
          createNewRing={handleCreateNewRing}
          backHome={handleBackHome}
        />
      </div>
    </div>
  );
};

export default Ring;