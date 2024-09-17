import { useForm } from "react-hook-form"; 
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useEffect, useState } from "react"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Progress } from "@/components/ui/progress"; 
import useUserInfo from "@/hooks/useUserInfo";
import { useToast } from "@/hooks/use-toast"


const CreateRingFormSchema = z.object({
  imagem: 
  z.unknown().transform(value => value as FileList)
    .optional()
    .refine(value => {
      if (!value) return true;
      if (value.length === 0) return true;
      const file = value[0];
      return file.type.startsWith("image/");
    }, {
      message: "Imagem inválida",
    }),
  nome: z.string().min(1, "O anel precisa de um nome."),
  poder: z.string().min(1, "Você precisa escrever o poder do anel."),
  descricao: z.string().min(1, "Você precisa escrever uma descrição."),
  forjadoPorId: z.number().optional(),
  portadorId: z.number().nullable().default(null),
});

type FormData = z.infer<typeof CreateRingFormSchema>;

const CreateRingForm = ({params,goBack}: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const [ringId, setRingId] = useState<number | null>(null); 
  const [forjando, setForjando] = useState<boolean>(false);

  const { toast } = useToast()
  const { user }: any = useUserInfo();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(CreateRingFormSchema),
    defaultValues: {
      forjadoPorId:user && user.id,
      portadorId: null,
    },
  });

  useEffect(() => {
    if (params!=undefined) {
      setRingId(params.id)
      setValue("nome", params.nome);
      setValue("poder", params.poder);
      setValue("descricao", params.descricao);
      setValue("forjadoPorId",params.forjadoPor && params.forjadoPor.id );
      setValue("portadorId", params.portador && params.portador.id);

      if (params.imagem) {
        setImagePreview(params.imagem); 
        setImageFile(null);
      }
    }else{
      setValue("forjadoPorId",user && user.id );

    }
  }, [params, setValue]);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      setValue('imagem', e.target.files); 
    } else {
      setImagePreview(null);
      setImageFile(null);
      //@ts-ignore
      setValue('imagem', null); 
    }
  };

  const uploadImage = async (portadorId:number,file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', portadorId.toString());

    try {
      const token = localStorage.getItem('TOKEN');
      const response = await fetch('http://localhost:3000/api/aneis/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  const editRingImage = async (id: number| null, file: File) => {
    if(id==null) return
    const formData = new FormData();
    formData.append('file', file);
    //@ts-ignore
    formData.append('id', id); 
  
    try {
      const token = localStorage.getItem('TOKEN');
      const response = await fetch('http://localhost:3000/api/aneis/edit-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
  
      const result = await response.json();
      result.data.ringId==""
      return result.data;
    } catch (error) {
      console.error('Error uploading and editing image:', error);
      throw error;
    }
  };

  const onSubmit = async (data: FormData) => {
    setForjando(true);

    let imgData: any = '';
    if (imageFile) {
      try {
        if(Object.keys(params).length>0){
          imgData = await editRingImage(ringId,imageFile);
        }else{
          imgData = await uploadImage(user && user.id ,imageFile);

        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setForjando(false);
        return;
      }
    }

    data.forjadoPorId = parseInt(user.id)
    try {
      const operation = ringId == null && imgData.ringId == "" ? null : imgData.ringId !== "" ? imgData.ringId : ringId;
      const token = localStorage.getItem('TOKEN');
      const response = await fetch(`http://localhost:3000/api/aneis`, {
        method: operation || Object.keys(params).length>0 ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          id:operation,
          imagem: imageFile ? imgData.ringId + "_" + imgData.imageName :  "", 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      if(!result.success){

        toast({
          title: "Atenção",
          description: result.message,
        })
      }else{
       
          toast({
            title: "Atenção",
            description: result.message,
          })
      }
      

      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      goBack()
      setForjando(false);
    }
  };

  if (forjando) {
    return (
      <div className="w-full flex justify-center flex-nowrap flex-col">
        <div className="w-full flex justify-center">
          <img height={300} width={400} src="https://i.pinimg.com/originals/3c/22/66/3c2266565ba185146ced8efee25994a3.gif" alt="forge hammer" />
        </div>
        <Progress value={75} className="w-full" />
        <p className="mt-2 text-xl text-gray-500">Forjando o anel...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit,(error:any)=>console.log(error))} className="space-y-4">
      {/* Image Input */}
      <div>
        <label htmlFor="imagem" className="block text-sm font-medium">Imagem</label>
        <Input
          id="imagem"
          type="file"
          accept="image/*"
          {...register("imagem")}
          onChange={handleImageChange}
        />
        {errors.imagem && <p className="text-red-600 text-sm">{errors.imagem.message}</p>}
      </div>

      {imagePreview && (
        <div className="mt-2">
          <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover border rounded-lg" />
        </div>
      )}

      {/* Other form inputs */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium">Nome</label>
        <Input id="nome" type="text" {...register("nome")} placeholder="Digite o nome" />
        {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message}</p>}
      </div>

      <div>
        <label htmlFor="poder" className="block text-sm font-medium">Poder</label>
        <Input id="poder" type="text" {...register("poder")} placeholder="Digite o poder" />
        {errors.poder && <p className="text-red-600 text-sm">{errors.poder.message}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium">Descrição</label>
        <Input id="descricao" type="text" {...register("descricao")} placeholder="Digite a descrição" />
        {errors.descricao && <p className="text-red-600 text-sm">{errors.descricao.message}</p>}
      </div>
     
      <Button className="mt-4" type="submit">{Object.keys(params).length > 0 ? 'Editar Anel':'Forjar Anel'}</Button>
    </form>
  );
};

export default CreateRingForm;
