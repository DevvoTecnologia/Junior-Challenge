import { AxiosError } from "axios";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FaArrowLeft,
  FaCrown,
  FaEdit,
  FaHammer,
  FaPowerOff,
  FaTimes,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import CustomButton from "../../../../components/CustomButton";
import InputForm from "../../../../components/InputForm";
import SelectForm from "../../../../components/SelectForm";
import api from "../../../../services/api";
import {
  BackButton,
  Form,
  FormContainer,
  ImagePreview,
  RemoveImageButton,
  TitleContainer,
} from "./styles";

interface RingFormData {
  name: string;
  power: string;
  carrier: string;
  forgedBy: string;
  image_url: File | null;
}

interface ValidationErrors {
  [key: string]: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  power: Yup.string().required("Poder é obrigatório"),
  carrier: Yup.string().required("Portador é obrigatório"),
  forgedBy: Yup.string().required("Forjado é obrigatório"),
  image: Yup.mixed().required("Imagem é obrigatória"),
});

const EditRings = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [uploadedImage, setUploadedImage] = useState<{
    id: string;
    file: File;
  } | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [formData, setFormData] = useState<Omit<RingFormData, "image_url">>({
    name: "",
    power: "",
    carrier: "",
    forgedBy: "",
  });

  const forgers = ["Elfos", "Anões", "Homens", "Sauron"];

  useEffect(() => {
    const fetchRingData = async () => {
      try {
        const response = await api.get(`/api/rings/${id}`);
        const { name, power, carrier, forgedBy, image_url } = response.data;
        setFormData({ name, power, carrier, forgedBy });
        if (image_url) {
          const imageFile = await fetch(image_url).then((res) => res.blob());
          setUploadedImage({
            id: uuidv4(),
            file: new File([imageFile], "image.jpg"),
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do anel", error);
      }
    };

    fetchRingData();
  }, [id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    try {
      validationSchema.validateSync(
        { ...formData, image: uploadedImage?.file },
        { abortEarly: false }
      );
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = err.inner.reduce<ValidationErrors>(
          (acc, curr) => {
            if (curr.path) acc[curr.path] = curr.message;
            return acc;
          },
          {}
        );
        setValidationErrors(errorMessages);
      }
      return false;
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (uploadedImage) {
        formDataToSend.append("image", uploadedImage.file);
      }

      try {
        const response = await api.put(`/api/rings/${id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success(response.data.message || "Anel atualizado com sucesso!");

        navigate("/rings/list");
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || "Erro ao atualizar o anel."
          );
        } else {
          toast.error("Erro desconhecido ao atualizar o anel.");
        }
        console.error("Erro ao atualizar o anel", error);
      }
    }
  };

  const handleImageUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const newImage = { id: uuidv4(), file };
        setUploadedImage(newImage);
      }
    },
    []
  );

  const handleRemoveImage = () => {
    setUploadedImage(null);

    const fileInput = document.querySelector(
      'input[name="image"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/rings/${id}`);
      toast.success(response.data.message || "Anel excluído com sucesso!");
      navigate("/rings/list");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Erro ao deletar o anel.");
      } else {
        toast.error("Erro desconhecido ao deletar o anel.");
      }
      console.error("Erro ao deletar o anel", error);
    }
  };
  return (
    <FormContainer>
      <TitleContainer>
        <div>
          <BackButton onClick={() => navigate("/rings/list")}>
            <FaArrowLeft size={24} />
          </BackButton>
          <h1>Editar Anel</h1>
        </div>

        <CustomButton
          bgColor="#dc3545"
          hoverColor="#c82333"
          onClick={handleDelete}
        >
          <FaTrash /> Excluir
        </CustomButton>
      </TitleContainer>

      <Form onSubmit={handleFormSubmit}>
        <InputForm
          label="Nome"
          name="name"
          placeholder="Nome do anel"
          value={formData.name}
          onChange={handleInputChange}
          icon={<FaCrown />}
          error={validationErrors.name}
        />
        <InputForm
          label="Poder"
          name="power"
          placeholder="Poder do anel"
          value={formData.power}
          onChange={handleInputChange}
          icon={<FaPowerOff />}
          error={validationErrors.power}
        />
        <InputForm
          label="Portador"
          name="carrier"
          placeholder="Portador do anel"
          value={formData.carrier}
          onChange={handleInputChange}
          icon={<FaUser />}
          error={validationErrors.carrier}
        />

        <SelectForm
          label="Forjado Por"
          name="forgedBy"
          value={formData.forgedBy}
          onChange={handleInputChange}
          options={forgers.map((forger) => ({
            value: forger,
            label: forger,
          }))}
          icon={<FaHammer />}
          error={validationErrors.forgedBy}
        />

        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {uploadedImage && (
          <div>
            <ImagePreview
              src={URL.createObjectURL(uploadedImage.file)}
              alt="Preview"
            />
            <RemoveImageButton type="button" onClick={handleRemoveImage}>
              <FaTimes /> Remover Imagem
            </RemoveImageButton>
          </div>
        )}

        <CustomButton type="submit" bgColor="#007bff" hoverColor="#0056b3">
          <FaEdit /> Editar
        </CustomButton>
      </Form>
    </FormContainer>
  );
};

export default EditRings;
