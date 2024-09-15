import Slider from "react-slick";

import styles from './custom-slider.module.css';
import { useState } from "react";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  centerMode: false,
  variableWidth: true,
  adaptiveHeight: true,
  slidesToShow: 1,
};

type CardData = {
  id: string;
  name: string;
  power: string;
  forgedBy: string;
  bearer: string;
  image: string;
}

interface CustomSliderProps {
  cards: CardData[];
  reload: () => void;
}

export function CustomSlider({ cards, reload }: CustomSliderProps) {
  const [cardIdEditing, setCardIdEditing] = useState<string>('');
  const [cardIdRemoving, setCardIdRemoving] = useState<string>('');
  const [power, setPower] = useState('');
  const [bearer, setBearer] = useState('');

  const handleEdit = async (ringId: string) => {
    try {
      const body = {
        power: power,
        bearer: bearer,
      };
      
      const response = await fetch(`http://localhost:3000/rings/${ringId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (response.status === 200) {
        alert('Anel editado com sucesso');
      }
    } catch (error) {
      console.error(error);
      alert('Erro, tente novamente');
    } finally {
      setCardIdEditing('');
      reload();
    }
  };

  const handleRemove = async (ringId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/rings/${ringId}`, {
        method: 'DELETE',
      });
  
      if (response.status === 200) {
        alert('Anel deletado com sucesso');
      }
    } catch (error) {
      console.error(error);
      alert('Erro, tente novamente');
    } finally {
      setCardIdRemoving('');
      reload();
    }
  };

  const convertRingForgedBy = (forgedBy: string) => {
    switch (forgedBy) {
      case 'ELVES':
        return 'ELFOS';
      case 'DWARVES':
        return 'ANÕES';
      case 'MEN':
        return 'HOMENS';
      case 'SAURON':
        return 'SAURON';
    }
  }

  return (
    <section className={styles.Container}>
      <Slider {...settings}>
        {cards.map((card) => {
          const isEditing = cardIdEditing === card.id;
          const isRemoving = cardIdRemoving === card.id;

          return (
            <div key={card.id} className={styles.ContainerSlider}>
              <div className={styles.ContainerCard}>
                <div className={styles.ContainerCardImage}>
                  <img src='src/assets/ring.webp' alt='' />
                </div>
                
                <div className={styles.ContainerCardContent}>
                  <div>
                    <h3>{card.name}</h3>

                    <span>Forjado por: {convertRingForgedBy(card.forgedBy)}</span>

                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={power}
                          required
                          onChange={(e) => setPower(e.target.value)}
                        />
                        <input
                          type="text"
                          value={bearer}
                          required
                          onChange={(e) => setBearer(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <p>{card.power}</p>
                        <p>Portador: {card.bearer}</p>
                      </>
                    )}
                  </div>

                  {!isEditing && !isRemoving && (
                    <div className={styles.ContainerActions}>
                      <button
                        className={styles.EditButton}
                        onClick={() => {
                          setPower(card.power);
                          setBearer(card.bearer);
                          setCardIdEditing(card.id);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className={styles.RemoveButton}
                        onClick={() => setCardIdRemoving(card.id)}
                      >
                        Remover
                      </button>
                    </div>
                  )}

                  {isEditing && (
                    <div className={styles.ContainerActions}>
                      <button
                        className={styles.EditButton}
                        onClick={() => {
                          handleEdit(card.id);
                        }}
                      >
                        Confirmar
                      </button>
                      <button
                        className={styles.RemoveButton}
                        onClick={() => setCardIdEditing('')}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}

                  {isRemoving && (
                    <div className={styles.ContainerActions}>
                      <button
                        className={styles.EditButton}
                        onClick={() => {
                          handleRemove(card.id);
                        }}
                      >
                        Confirmar
                      </button>
                      <button
                        className={styles.RemoveButton}
                        onClick={() => setCardIdRemoving('')}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
