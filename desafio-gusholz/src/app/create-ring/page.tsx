'use client'
import { useState, useEffect } from "react";
import styles from "./Create-ring.module.css"
import NextImage from "next/image";
import NavBar from "@/components/navBar";
import Button from "@/components/button";
import Footer from "@/components/footer";
import Modal from "@/components/modal";
import FormSection from "@/components/form";
import { AnelModel } from "@/models/ring";

enum Tabs {
  create,
  update
}

const imagesMock = [
  "/static/images/ring-artwork-1.jpg",
  "/static/images/ring-artwork-2.jpg",
  "/static/images/ring-artwork-3.jpg",
  "/static/images/ring-artwork-4.jpg",
]

let modalMsg = "Anel criado com sucesso!"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.create);
  const [selectedRingToUpdateId, setSelectedRingToUpdateId] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [rings, setRings] = useState<AnelModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    poder: "",
    portador: "",
    forjadoPor: "Elfos",
    imagem: "/static/images/ring-artwork-1.jpg",
  });

  function resetFormData() {
    setFormData({
      nome: "",
      poder: "",
      portador: "",
      forjadoPor: "Elfos",
      imagem: "/static/images/ring-artwork-1.jpg",
    });
  }

  function canUpdate(): boolean {
    if (selectedRingToUpdateId === 0) return false;

    return true
  }

  function canCreate(): boolean {
    if (formData.nome === "") { return false }
    if (formData.poder === "") { return false }
    if (formData.portador === "") { return false }
    if (formData.forjadoPor === "") { return false }

    return true
  }

  function determineModalMsg(forjadoPor: string): string {
    switch (forjadoPor) {
      case "Sauron":
        return `Não foi possível finalizar a criação! O Sauron só pode ter 1 anel!`
      case "Elfos":
        return `Não foi possível finalizar a criação! Os Elfos só podem ter 3 anéis!`
      case "Anões":
        return `Não foi possível finalizar a criação! O Anões só podem ter 7 anéis!`
      case "Humanos":
        return `Não foi possível finalizar a criação! Os Humanos só podem ter 9 anéis!`
      default:
        return `Não foi possível finalizar a criação!`
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchRings = async () => {
    try {
      const response = await fetch('/api');
      const data = await response.json();
      setRings(data.data);
    } catch (error) {
      console.error('Error fetching rings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRings();
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setFormData((prevState) => ({
      ...prevState,
      imagem: imagesMock[index],
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = async () => {
    const updatedData = {
      ...formData
    }

    try {
      const response = await fetch(`/api/${selectedRingToUpdateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        modalMsg = "Anel atualizado com sucesso!"
        setShowModal(true);
        fetchRings();
      } else {
        console.error("Erro: não foi possível finalizar a operação POST", response.statusText);
      }
    } catch (error) {
      console.error("Erro: não foi possível atualizar", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      imagem: formData.imagem
    };


    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      console.log(finalData);
      console.log(response)
      if (response.ok) {
        modalMsg = "Anel criado com sucesso!"
        setShowModal(true);
        setSelectedImage(0);
        resetFormData();
        fetchRings();
      } else {
        modalMsg = determineModalMsg(formData.forjadoPor);
        setShowModal(true);
        setSelectedImage(0);
        resetFormData();
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
            onClick={() => {
              setSelectedTab(Tabs.create);
              resetFormData();
            }}
            className={selectedTab === Tabs.create ? styles.formHeaderTab : styles.formHeaderTabInactive}>
            Criar novo anel
          </h3>
          <h3
            onClick={() => {
              setSelectedTab(Tabs.update);
              resetFormData();
              setSelectedRingToUpdateId(0);
            }}
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
            : <>
              {isLoading ? (
                <span>Carregando</span>
              ) : (
                <div className={styles.ringContainer}>
                  {rings.length > 0 ? (
                    rings.map((ring) => (
                      <div className={styles.ringDisplay} key={ring.id}>
                        <h1 className={styles.header}>Selecione o anel que deseja atualizar</h1>
                        <NextImage
                          src={ring.imagem}
                          alt={`Imagem do anel ${ring.nome}`}
                          width={100}
                          height={100}
                          onClick={() => {
                            setSelectedRingToUpdateId(ring.id);
                            setFormData(ring)
                          }}
                          className={selectedRingToUpdateId === ring.id ? styles.selectedImage : styles.imageButton}
                        />
                        <span className={styles.ringName}>{ring.nome}</span>
                      </div>
                    ))
                  ) : (
                    <span className={styles.emptyLabel}>Nenhum anel disponível para atualização</span>
                  )}
                </div>
              )}
            </>}
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
          <Modal message={modalMsg} onClose={handleCloseModal} />
        )}

        {selectedTab === Tabs.create ?
          <Button action={handleSubmit} buttonText="Criar Anel" condition={canCreate()} /> :
          <Button action={handleUpdate} buttonText="Atualizar Anel" condition={canUpdate()} />}
      </main>
      <Footer />
    </div>
  );
}
