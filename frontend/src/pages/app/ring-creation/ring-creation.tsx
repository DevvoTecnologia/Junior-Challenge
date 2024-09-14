import { useState } from "react";
import { RingCreationSuccess } from "./components/ring-creation-success";
import { RingCreationForm } from "./components/ring-creation-form";

export const RingCreation = () => {
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false);

  return creationSuccess ? (
    <RingCreationSuccess setCreationSuccess={setCreationSuccess} />
  ) : (
    <RingCreationForm setCreationSuccess={setCreationSuccess} />
  );
};
