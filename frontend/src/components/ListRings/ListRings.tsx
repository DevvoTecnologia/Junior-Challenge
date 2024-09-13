// Components
import Slider from "react-slick";
// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Types
import { RingData } from "../../types/RingData";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ListRingsProps {
  ringsData: RingData[];
  onUpdateRing: (ring: RingData) => void;
  onDeleteRing: (id: string) => void;
}

const ListRings = ({
  ringsData,
  onUpdateRing,
  onDeleteRing,
}: ListRingsProps) => {
  const handleDeleteRing = (id: string) => {
    onDeleteRing(id);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-3/5 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
          {ringsData.map((d) => (
            <div
              className="bg-[#DADDD8] h-[450px] text-black rounded-xl cursor-grab"
              key={d._id}
            >
              <div className="h-56 rounded-t-xl bg-[#DADDD8] flex justify-center items-center">
                <img src={d.imagem} alt="" className="h-44 w-44 rounded-full" />
              </div>
              <div className="flex flex-col  justify-center items-center gap-4">
                <p className="text-xl font-semibold">{d.nome}</p>
                <p className="text-md font-medium">{d.poder}</p>
                <p className="text-md font-medium">{d.portador}</p>
                <p className="text-md font-medium">{d.forjadoPor}</p>
                <div className="flex w-full justify-around">
                  <div
                    className="flex items-center justify-center rounded-full bg-[#ECEBE4] size-10 hover:bg-green-100 cursor-pointer"
                    onClick={() => onUpdateRing(d)}
                  >
                    <EditIcon color="success" />
                  </div>
                  <div
                    className="flex items-center justify-center rounded-full bg-[#ECEBE4] hover:bg-red-100 size-10 cursor-pointer"
                    onClick={() => handleDeleteRing(d._id as string)}
                  >
                    <DeleteIcon color="error" sx={{ cursor: "pointer" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ListRings;
