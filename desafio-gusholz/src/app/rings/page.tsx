"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import styles from "./rings-page.module.css";
import CardsSlider from "@/components/cardSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import { AnelModel } from "@/models/ring";
import Modal from "@/components/modal";

export default function ViewRingsPage() {
  const [rings, setRings] = useState<AnelModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchRings = async () => {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      setRings(data.data);
    } catch (error) {
      console.error("Não foi possível dar GET nos aneis", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRings();
  }, []);

  if (loading)
    return (
      <main className={styles.main}>
        <NavBar selectedPage={2} />
        <p>Carregando...</p>
        <Footer />
      </main>
    );

  return (
    <main className={styles.main}>
      <NavBar selectedPage={2} />
      <CardsSlider rings={rings} />
      <Footer />
      {showModal && <Modal
        message="Insira o novo valor para o campo"
        withInput={true}
        onClose={() => setShowModal(false)}
        onConfirm={(inputValue) => console.log("User entered:", inputValue)} />}
    </main>
  );
}
