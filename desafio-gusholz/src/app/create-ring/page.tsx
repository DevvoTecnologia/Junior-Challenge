'use client'
import { useState } from "react";
import styles from "./Create-ring.module.css"
import NextImage from "next/image";
import NavBar from "@/components/navBar";
import Button from "@/components/button";
import Footer from "@/components/footer";
import Modal from "@/components/modal";
import FormSection from "@/components/form";

enum Tabs {
  create,
  update
}

const imagesMock = [
  "/static/images/one_ring_art.png",
  "/static/images/one_ring_art.png",
  "/static/images/one_ring_art.png",
  "/static/images/one_ring_art.png",
]

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.create);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    poder: "",
    portador: "",
    forjadoPor: "Elfos",
    imagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setFormData((prevState) => ({
      ...prevState,
      imagem: imagesMock[index],
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nome: "",
      poder: "",
      portador: "",
      forjadoPor: "Elfos",
      imagem: "",
    })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      imagem: formData.imagem
    };

    console.log(finalData);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        console.error("Erro: não foi possível finalizar a operação POST", response.statusText);
      }
    } catch (error) {
      console.error("Erro: não foi possível submeter o formulário", error);
    }
  };

  return (
    <div className={styles.page}>
      <NavBar selectedPage={1} />
      <main className={styles.main}>

        <div className={styles.formHeaderContainer}>
          <h3
            onClick={() => { setSelectedTab(Tabs.create) }}
            className={selectedTab === Tabs.create ? styles.formHeaderTab : styles.formHeaderTabInactive}>
            Criar novo anel
          </h3>
          <h3
            onClick={() => { setSelectedTab(Tabs.update) }}
            className={selectedTab === Tabs.update ? styles.formHeaderTab : styles.formHeaderTabInactive}>
            Atualizar anel
          </h3>
        </div>

        <form className={styles.formulario} onSubmit={handleSubmit}>
          {selectedTab === Tabs.create ?
            <div className={styles.formularioContainer}>
              <span className={styles.formularioLabel} >Selecione uma imagem para o anel:</span>
              <div className={styles.formularioImagesContainer}>
                {imagesMock.map((imageUrl, index) => (
                  <button
                    className={styles.imageButton}
                    key={index}
                    type="button"
                    onClick={() => handleImageClick(index)}
                  >
                    <NextImage
                      src={imageUrl}
                      alt={`Image ${index}`}
                      width={100}
                      height={100}
                      className={selectedImage === index ? styles.selectedImage : styles.image}
                    />
                  </button>
                ))}
              </div>
            </div>
            : <></>}
          <FormSection
            name={"nome"}
            value={formData.nome}
            descriptionLabel="Nome do anel:"
            placeholder="ex: The one ring"
            isDropdown={false}
            callbackFunc={handleChange}
          />
          <FormSection
            name={"poder"}
            value={formData.poder}
            descriptionLabel="Poder do anel:"
            placeholder="ex: permite ao seu usuário ficar invisível"
            isDropdown={false}
            callbackFunc={handleChange}
          />
          <FormSection
            name={"portador"}
            value={formData.portador}
            descriptionLabel="Portador do anel:"
            placeholder="ex: Gandalf"
            isDropdown={false}
            callbackFunc={handleChange}
          />
          <FormSection
            name={"forjadoPor"}
            value={formData.forjadoPor}
            descriptionLabel="Forjado por:"
            placeholder="Elfos"
            isDropdown={true}
            callbackFunc={handleChange}
          />
        </form>

        {showModal && (
          <Modal message="Anel criado com sucesso!" onClose={handleCloseModal} />
        )}

        <Button action={handleSubmit} buttonText={selectedTab === Tabs.create ? "Criar Anel" : "Atualizar Anel"}></Button>
      </main>
      <Footer />
    </div>
  );
}
