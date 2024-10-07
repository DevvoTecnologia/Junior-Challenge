import { Form, Input, Button } from 'antd';
import { FiUser } from 'react-icons/fi';
import cx from 'classnames';
import useMedia from 'use-media';
import { PropsLogin } from '../../interfaces/LoginInterface';
import './styles.css';

const LoginModule = ({ createAccount, login, setLoading, loading }: PropsLogin): JSX.Element => {
  const isMobile = useMedia({ maxWidth: 767 });

  const validateEmail = () => ({
    async validator(rule: any, value: any) {
      if (value) {
        const regexEmailOnlyCharacters = new RegExp("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ@. ]+$");
        const regexEmailAddress = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!regexEmailOnlyCharacters.test(value)) {
          // return Promise.reject(message.validate_name);
        };

        if (!regexEmailAddress.test(value)) {
          // return Promise.reject(message.validate_email)
        };
      }

      return Promise.resolve();
    }
  });

  return (
    <div className="login-module">
      <div className="flex flex-column justify-center item-center w-100">
        <div className="mb-24">
          <FiUser className="f32" />
        </div>
        <span className="f24 b mb-32">Conecte a sua conta</span>
        <Form
          name="login"
          onFinish={login}
          onFinishFailed={() => setLoading(false)}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'O email é obrigatório.' }, validateEmail]}
            className="mb-12"
          >
            <Input
              placeholder="Digite seu email"
              disabled={loading ? true : false}
              className="input-base input-login"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                type: "string",
                required: true,
                min: 6,
                message: 'A senha é obrigatória.'
              }
            ]}
            className={cx({ "mb-26": isMobile, "mb-32": !isMobile })}
          >
            <Input.Password
              placeholder="Digite sua senha"
              disabled={loading ? true : false}
              className="input-base input-login"
            />
          </Form.Item>
          <Form.Item className="mt-24">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setLoading(true)}
              loading={loading}
              className="btn-login"
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          onClick={createAccount}
        >
          Nova Conta
        </Button>
      </div>
    </div>
  );
};

export default LoginModule;