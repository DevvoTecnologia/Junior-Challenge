import "./App.css";
import CardSlider from "./components/Slider/Slider";
import CreateRing from "./screen/Create/CreateRing";
import { BiSolidPlusSquare } from "react-icons/bi";
import { useRingContext } from "./context/RingContext";
import { IconContext } from "react-icons";

function App() {
  const { showEditOverlay, showOverlay, setShowOverlay } = useRingContext();

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <main>
      <h2>desafio_devvo</h2>
      <h1>Os Anéis de Poder</h1>
      <section>
        <h3>Todos os anéis:</h3>
        <button className="add_btn" onClick={toggleOverlay}>
          <IconContext.Provider
            value={{ color: "#d1d1d1", className: "add_icon" }}
          >
            <BiSolidPlusSquare />
          </IconContext.Provider>
        </button>
        <CardSlider />
      </section>

      {showOverlay && <CreateRing isEdit={false} />}
      {showEditOverlay && <CreateRing isEdit={true} />}
    </main>
  );
}

export default App;
