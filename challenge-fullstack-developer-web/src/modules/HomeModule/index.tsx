import { Button, Form, Input, Modal, Select, Spin } from 'antd';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { PropsHome } from '../../interfaces/HomeInterface';
import Slider from 'react-slick';
import _map from 'lodash/map';
import useMedia from 'use-media';
import './styles.css';

const HomeModule = ({
  loading,
  loadingEdit,
  listRings,
  ringData,
  openEdit,
  openDelete,
  setOpentEdit,
  setOpentDelete,
  setIdDelete,
  createNewRing,
  updateActualRing,
  retrieveRingData,
  deleteRing,
  logout
}: PropsHome): JSX.Element => {
  const [form] = Form.useForm();
  const isMobile = useMedia({ maxWidth: 767 });
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const forged = [
    { name: "Elfos", value: "ELVES" },
    { name: "Anões", value: "DWARVES" },
    { name: "Homens", value: "MEN" },
    { name: "Sauron", value: "SAURON" }
  ];

  const handleDeleteView = (id: string) => {
    setIdDelete(id);
    setOpentDelete(!openDelete);
  };

  const handleSubmit = (body: any) => {
    updateActualRing(body);
  };

  return (
    <div className="home-container">
      {isMobile ? (
        <h2 className="text-center mb-32">Os Anéis de Poder</h2>
      ) : (
        <h1 className="text-center mb-32">Os Anéis de Poder</h1>
      )}
      <div className="flex justify-end mb-32">
        <Button type="primary" onClick={createNewRing}>
          Novo Anel
        </Button>
        <Button type="primary" className="ml-12" onClick={logout}>
          Sair
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center item-center">
          <Spin tip="Carregado" size="large" />
        </div>
      ) : (
        <>
          {isMobile ? (
            <div className="slider-container">
              <Slider {...settings}>
                {_map(listRings, (item, index) => (
                  <div key={index} className="card-home">
                    <img
                      src={item.image}
                      className="image-size"
                    />
                    <span className="b mt-12">{item.name}</span>
                    <span className="b mt-12">Portador: {item.carrier}</span>
                    <span className="b mt-12">Forjado por: {item.forgedBy}</span>
                    <p className="mt-16 text-center">{item.power}</p>
                    <div className="flex flex-row justify-evenly mt-24 w-100">
                      <button className="btn-link" onClick={() => handleDeleteView(item.id)}>
                        <FiTrash2 className="f24" />
                      </button>
                      <button className="btn-link" onClick={() => retrieveRingData(item.id)}>
                        <FiEdit className="f24" />
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="grid-container">
              {_map(listRings, (item, index) => (
                <div key={index} className="card-home">
                  <img
                    src={item.image}
                    className="image-size"
                  />
                  <span className="b mt-12">{item.name}</span>
                  <span className="b mt-12">Portador: {item.carrier}</span>
                  <span className="b mt-12">Forjado por: {item.forgedBy}</span>
                  <p className="mt-16 text-center">{item.power}</p>
                  <div className="flex flex-row justify-evenly mt-24 w-100">
                    <button className="btn-link" onClick={() => handleDeleteView(item.id)}>
                      <FiTrash2 className="f24" />
                    </button>
                    <button className="btn-link" onClick={() => retrieveRingData(item.id)}>
                      <FiEdit className="f24" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <Modal
        title="Editar Anel"
        open={openEdit}
        onOk={form.submit}
        onCancel={() => setOpentEdit(!openEdit)}
      >
        <Form
          name="edit-ring"
          form={form}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          initialValues={{ ...ringData }}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'O nome é obrigatório.' }]}
            className="mb-12"
          >
            <Input
              placeholder="Digite o nome"
              disabled={loadingEdit ? true : false}
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
              disabled={loadingEdit ? true : false}
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
              disabled={loadingEdit ? true : false}
              className="input-base input-login"
            />
          </Form.Item>
          <Form.Item
            label="Forjado Por"
            name="forgedBy"
            rules={[{ required: true, message: 'O forjado por é obrigatório.' }]}
            className="mb-12"
          >
            <Select disabled={loadingEdit ? true : false}>
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
              disabled={loadingEdit ? true : false}
              className="input-base input-login"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Deletar Anel"
        open={openDelete}
        onOk={deleteRing}
        onCancel={() => setOpentDelete(!openDelete)}
      >
        <p>Você tem certeza que deseja deletar o anel Nome Anel?</p>
      </Modal>
    </div>
  );
};

export default HomeModule;