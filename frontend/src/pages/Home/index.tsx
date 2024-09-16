import { RingForm } from "../../components/RingForm";

export const Home = () => {
  const defaultRing = {
    _id: '',
    ringname: '',
    forgedby: '',
    carrier: '',
    description: '',
    image: ''
  };

  return (
    <RingForm ring={defaultRing}/>
  );
}