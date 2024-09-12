'use client'
import { useState } from "react";
import styles from "./page.module.css";
import NextImage from "next/image";
import NavBar from "@/components/navBar";
import Button from "@/components/button";
import Footer from "@/components/footer";
import MadeBy from "@/models/madeBy";

interface FormData {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

interface RingFormProps {
  onSubmit: (formData: FormData) => void;
}

const imagesMock = [
  "/static/images/one_ring_art.png",
  "/static/images/one_ring_art.png",
  "/static/images/one_ring_art.png",
  "/static/images/one_ring_art.png",
]

enum Tabs {
  create,
  update
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.create);
  const [formData, setFormData] = useState({
    nome: "",
    poder: "",
    portador: "",
    forjadoPor: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      imagem: formData.imagem
    };

    console.log(finalData);
    // onSubmit(finalData);
  };

  return (
    <div className={styles.page}>
      <NavBar isHomepage={true} />
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
          {selectedTab === Tabs.update ? <div className={styles.formularioContainer}>
            <span className={styles.formularioLabel} >Selecione o anel para atualiza-lo:</span>
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
          </div> : <></>}
          <div className={styles.formularioContainer}>
            <label className={styles.formularioLabel} htmlFor="nome">Nome do Anel:</label>
            <input
              className={styles.formularioInputField}
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="ex: The One Ring"
            />
          </div>

          <div className={styles.formularioContainer}>
            <label className={styles.formularioLabel} htmlFor="poder">Poder:</label>
            <input
              className={styles.formularioInputField}
              type="text"
              id="poder"
              name="poder"
              value={formData.poder}
              onChange={handleChange}
              required
              placeholder="ex: Concede invisibilidade!"
            />
          </div>

          <div className={styles.formularioContainer}>
            <label className={styles.formularioLabel} htmlFor="portador">Portador:</label>
            <input
              className={styles.formularioInputField}
              type="text"
              id="portador"
              name="portador"
              value={formData.portador}
              onChange={handleChange}
              required
              placeholder="ex: Gandalf"
            />
          </div>

          <div className={styles.formularioContainer}>
            <label className={styles.formularioLabel} htmlFor="forjadoPor">Forjado Por:</label>
            <select
              className={styles.formularioInputField}
              id="forjadoPor"
              name="forjadoPor"
              value={formData.forjadoPor}
              onChange={handleChange}
              required
            >
              {Object.entries(MadeBy).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

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
        </form>
        <Button action={handleSubmit} buttonText={selectedTab === Tabs.create ? "Criar Anel" : "Atualizar Anel"}></Button>
      </main>
      <Footer />
    </div>
  );
}
