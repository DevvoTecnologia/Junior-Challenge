import "./CreateRing.css";
import { BiSolidXSquare } from "react-icons/bi";
import Form from "../../components/Form/Form";
import { useRingContext } from "../../context/RingContext";
import { IconContext } from "react-icons";


type CreateRingProps = {
  isEdit: boolean;
};

export default function CreateRing({
  isEdit
}: CreateRingProps) {
  const { editingRingId, setShowOverlay, setShowEditOverlay } = useRingContext();

  const handleCloseBtn = () => {
    setShowOverlay(false)
    setShowEditOverlay(false)
  }

  return (
    <>
      <div className="bg">
        <div className="overlay">
          <button className="close_btn" onClick={handleCloseBtn}>
          <IconContext.Provider
            value={{ color: "#d1d1d1", className: "close_icon" }}
          >
            <BiSolidXSquare />
          </IconContext.Provider>
          </button>
          {isEdit === true ? (
            <>
              <h2>Edite o seu anel</h2>
              <Form id={editingRingId || ""} isEdit={true}/>
            </>
          ) : (
            <>
              <h2>Crie o seu anel</h2>
              <Form id={editingRingId || ""} isEdit={false}/>
            </>
          )}
        </div>
      </div>
    </>
  );
}
