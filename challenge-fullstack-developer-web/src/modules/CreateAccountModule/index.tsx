import { Form, Input, Button } from 'antd';
import { PropsAccount } from '../../interfaces/CreateAccountInterface';
import useMedia from 'use-media';

const CreateAccountModule = ({ createNewAccount, setLoading, loading }: PropsAccount): JSX.Element => {
  const isMobile = useMedia({ maxWidth: 767 });
  const validateName = () => ({
    validator(rule: any, value: any) {
      if (value) {
        const regexNameOnlyCharacters = new RegExp("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$");

        if (!regexNameOnlyCharacters.test(value)) {
          return Promise.reject("É permitido somente letras neste campo.");
        };
      };

      return Promise.resolve();
    }
  });

  const validateEmail = () => ({
    async validator(rule: any, value: any) {
      if (value) {
        const regexEmailOnlyCharacters = new RegExp("[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ@. ]+$");
        const regexEmailAddress = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!regexEmailOnlyCharacters.test(value)) {
          return Promise.reject("É permitido somente letras neste campo.");
        };

        if (!regexEmailAddress.test(value)) {
          return Promise.reject("Você não digitou um e-mail válido!");
        };
      }

      return Promise.resolve();
    }
  });

  return (
    <div>
      {isMobile ? (
        <h2 className="text-center mb-32">Criar conta</h2>
      ) : (
        <h1 className="text-center mb-32">Criar conta</h1>
      )}
      <Form
        name="new-account"
        onFinish={createNewAccount}
        onFinishFailed={() => setLoading(false)}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'O nome é obrigatório.' }, validateName]}
        >
          <Input
            placeholder="Digite seu nome"
            disabled={loading ? true : false}
            className="input-base"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'O email é obrigatório.' }, validateEmail]}
        >
          <Input
            type="email"
            placeholder="Digite seu email"
            disabled={loading ? true : false}
            className="input-base"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              type: "string",
              required: true,
              message: "A senha é obrigatória."
            }
          ]}
        >
          <Input.Password
            placeholder="Digite sua senha"
            disabled={loading ? true : false}
            className="input-base"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setLoading(true)}
            loading={loading}
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccountModule;