import { useState } from "react";
import { Ring } from "../App";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState<Ring | null>(null);
  const [currentValue, setCurrentValue] = useState<Ring | null>(null);

  const openModalForCreate = () => {
    setInitialValues(null);
    setCurrentValue(null);
    setShowModal(true);
  };

  const openModalForEdit = (ring: Ring) => {
    setInitialValues(ring);
    setCurrentValue(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentValue(null);
    setInitialValues(null);
  };

  return {
    showModal,
    initialValues,
    currentValue,
    setCurrentValue,
    openModalForCreate,
    openModalForEdit,
    closeModal,
  };
};
