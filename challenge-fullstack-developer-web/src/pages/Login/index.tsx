import { useState } from 'react';
import { useStore } from '../../hooks/useStores';
import { notification } from 'antd';
import { FiX } from 'react-icons/fi';
import LoginModule from '../../modules/LoginModule';
import { history } from '../../helpers/history';
import { ROUTES } from '../../routes';

const Login = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { general } = useStore();
  const { authUser } = general;

  const handleLoginAccount = async (params: any) => {
    setLoading(true);

    const response = await authUser(params);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      history.navigate(ROUTES.HOME);
      setLoading(false);
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

  const handleCreateAccount = (): void => {
    history.navigate(ROUTES.CREATE_ACCOUNT);
  };

  return (
    <div>
      <LoginModule
        loading={loading}
        setLoading={setLoading}
        login={handleLoginAccount}
        createAccount={handleCreateAccount}
      />
    </div>
  );
};

export default Login;