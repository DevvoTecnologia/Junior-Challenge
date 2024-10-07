import { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStores';
import { notification } from 'antd';
import { FiX } from 'react-icons/fi';
import _get from 'lodash/get';
import HomeModule from '../../modules/HomeModule';
import { history } from '../../helpers/history';
import { ROUTES } from '../../routes';

const Home = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [listRings, setListRings] = useState([]);
  const [ringData, setRingData] = useState({});
  const [openEdit, setOpentEdit] = useState(false);
  const [openDelete, setOpentDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const { general } = useStore();
  const { logout, deleteRing, updateRing, getRingById, getAllRings } = general;

  const handleRetrieveRings = async () => {
    const response = await getAllRings();

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setListRings(response.data);
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

  useEffect(() => {
    handleRetrieveRings();
  }, []);

  const handleRetrieveRingData = async (id: any) => {
    setLoadingEdit(true);

    const response = await getRingById(id);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      setRingData(response.data);
      setOpentEdit(!openEdit);
      setLoadingEdit(false);
    } else {
      notification.error({
        message: "Houve um problema",
        description: response.message,
        placement: "bottom",
        duration: 4,
        closeIcon: <FiX className="i-24 white" />
      });
      setLoadingEdit(false);
    };
  };

  const handleUpdateActualRing = async (body: any) => {
    setLoadingEdit(true);

    if (!_get(ringData, "id", "")) return;

    const response = await updateRing(_get(ringData, "id"), body);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      handleRetrieveRings();
      setOpentEdit(!openEdit);
      setLoadingEdit(false);
    } else {
      notification.error({
        message: "Houve um problema",
        description: response.message,
        placement: "bottom",
        duration: 4,
        closeIcon: <FiX className="i-24 white" />
      });
      setLoadingEdit(false);
    };
  };

  const handleDeleteRing = async () => {
    if (!idDelete) return;

    const response = await deleteRing(idDelete);

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      const newResponse: any = listRings.filter((item: any) => item.id !== idDelete);
      setListRings(newResponse);
      setOpentDelete(false);
      setIdDelete("");
      setLoading(false);
      notification.success({
        message: "Deu tudo certo!",
        description: "O item foi excluído com sucesso.",
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
  
  const handleCreateNewRing = () => {
    history.navigate(ROUTES.RING);
  };

  return (
    <div className="container">
      <div className="content">
        <HomeModule
          loading={loading}
          loadingEdit={loadingEdit}
          listRings={listRings}
          ringData={ringData}
          openEdit={openEdit}
          openDelete={openDelete}
          setOpentEdit={setOpentEdit}
          setOpentDelete={setOpentDelete}
          setIdDelete={setIdDelete}
          retrieveRingData={handleRetrieveRingData}
          createNewRing={handleCreateNewRing}
          updateActualRing={handleUpdateActualRing}
          deleteRing={handleDeleteRing}
          logout={logout}
        />
      </div>
    </div>
  );
};

export default Home;