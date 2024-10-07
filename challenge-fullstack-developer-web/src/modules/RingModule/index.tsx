import { Button, Form, Input, Select } from 'antd';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { PropsRing } from '../../interfaces/Ring';
import useMedia from 'use-media';
import _map from 'lodash/map';
import cx from 'classnames';

const RingModule = ({ backHome, createNewRing, setLoading, loading }: PropsRing): JSX.Element => {
  const isMobile = useMedia({ maxWidth: 767 });
  const forged = [
    { name: "Elfos", value: "ELVES" },
    { name: "Anões", value: "DWARVES" },
    { name: "Homens", value: "MEN" },
    { name: "Sauron", value: "SAURON" }
  ];

  return (
    <div>
      {isMobile ? (
        <h2 className="text-center mt-24 mb-32">Novo anel</h2>
      ) : (
        <h1 className="text-center mt-24 mb-32">Novo anel</h1>
      )}
      <div className="mb-32">
        <button className="flex flex-row item-center btn-link" onClick={backHome}>
          <FiArrowLeftCircle className={cx({ "f16": isMobile, "f24": !isMobile })} />
          <span className={cx("ml-12", { "f16": isMobile, "f24": !isMobile })}>Voltar</span>
        </button>
      </div>
      <Form
        name="new-ring"
        onFinish={createNewRing}
        onFinishFailed={() => setLoading(false)}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: 'O nome é obrigatório.' }]}
          className="mb-12"
        >
          <Input
            placeholder="Digite o nome"
            disabled={loading ? true : false}
            className="input-base input-login"
          />
        </Form.Item>
        <Form.Item
          label="Poder"
          name="power"
          rules={[{ required: true, message: 'O poder é obrigatório.' }]}
          className="mb-12"
        >
          <Input
            placeholder="Digite o poder"
            disabled={loading ? true : false}
            className="input-base input-login"
          />
        </Form.Item>
        <Form.Item
          label="Portador"
          name="carrier"
          rules={[{ required: true, message: 'O portador é obrigatório.' }]}
          className="mb-12"
        >
          <Input
            placeholder="Digite o portador"
            disabled={loading ? true : false}
            className="input-base input-login"
          />
        </Form.Item>
        <Form.Item
          label="Forjado Por"
          name="forgedBy"
          rules={[{ required: true, message: 'O forjado por é obrigatório.' }]}
          className="mb-12"
        >
          <Select>
            {_map(forged, (item, index) => (
              <Select.Option key={index} value={item.value}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Link imagem"
          name="image"
          rules={[{ required: true, message: 'O link da imagem é obrigatório.' }]}
          className="mb-12"
        >
          <Input
            placeholder="Digite o link da imagem"
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
          >
            Criar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RingModule;