import { useState } from 'react';
import { useStore } from '../../hooks/useStores';
import { notification } from 'antd';
import { FiX } from 'react-icons/fi';
import _get from 'lodash/get';
import CreateAccountModule from '../../modules/CreateAccountModule';
import { history } from '../../helpers/history';
import { ROUTES } from '../../routes';

const CreateAccount = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { general } = useStore();
  const { registerAccount } = general;

  const handleCreateNewAccount = async (body: any) => {
    setLoading(true);

    const response = await registerAccount(body);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      history.navigate(ROUTES.LOGIN);
      setLoading(false);
      notification.success({
        message: "Deu tudo certo!",
        description: "Sua conta foi criada com sucesso.",
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

  return (
    <div className="container">
      <div className="content">
        <CreateAccountModule
          loading={loading}
          setLoading={setLoading}
          createNewAccount={handleCreateNewAccount}
        />
      </div>
    </div>
  );
};

export default CreateAccount;