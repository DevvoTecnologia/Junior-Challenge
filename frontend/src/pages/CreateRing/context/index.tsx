import { RingServices } from "@/services/rings";
import { IRings } from "@/types/IRings";
import { message, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import {
	createContext,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ICreateRingContext {
	form: any;
	loading: boolean;
	setLoading: React.Dispatch<SetStateAction<boolean>>;
	handleBack: () => void;
	handleBeforeUpload: (file: RcFile) => void;
	file?: RcFile;
	handleSubmit: () => void;
	ringById?: IRings;
}

interface ICreateRingProvider {
	children: ReactNode;
}

export const CreateRingContext = createContext<ICreateRingContext>(
	{} as ICreateRingContext
);

export function CreateRingProvider({ children }: ICreateRingProvider) {
	const navigate = useNavigate();
	const [form] = useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [file, setFile] = useState<RcFile | undefined>(undefined);
	const [ringById, setRingById] = useState<IRings | undefined>(undefined);
	const { id } = useParams();

	const getRingById = async (ringId: string) => {
		const { data } = await RingServices.getById(ringId);
		setRingById(data);
		form.setFieldsValue({
			...data,
			forged_by: data.forged_by.toLowerCase(),
			carrier_id: data.carrier.name.toLowerCase(),
		});
	};

	useEffect(() => {
		getRingById(id || "");
	}, [id]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleBeforeUpload = (file: RcFile) => {
		var image = new Image();
		const ImageUrl = URL.createObjectURL(file);
		image.src = ImageUrl;

		if (file.type === "application/pdf") {
			message.error("Arquivo não deve ser no formato PDF");
			return false;
		}
		setFile(file);
	};

	const handleSubmit = () => {
		setLoading(true);

		if (!ringById) {
			form
				.validateFields()
				.then(async (values) => {
					delete values.image;

					return await RingServices.create({ ...values, file: file }).then(
						() => {
							setLoading(false);
							notification.success({ message: "Anel cadastrado com sucesso" });
						}
					);
				})
				.catch((err) => {
					console.error(err);
				});
			return;
		}

		form
			.validateFields()
			.then(async (values) => {
				delete values.image;

				return await RingServices.update({
					body: { ...values, file: file },
					id: id || "",
				}).then(() => {
					setLoading(false);
					notification.success({ message: "Anel editado com sucesso" });
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<CreateRingContext.Provider
				value={{
					form,
					loading,
					setLoading,
					handleBack,
					handleBeforeUpload,
					file,
					handleSubmit,
					ringById,
				}}
			>
				{children}
			</CreateRingContext.Provider>
		</>
	);
}

export const useCreateRing = () => {
	const context = useContext(CreateRingContext);

	if (!context) {
		throw new Error("useCreateRing must be used with CreateRingContext");
	}

	return context;
};
