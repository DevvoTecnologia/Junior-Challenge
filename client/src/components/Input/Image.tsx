import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: React.ReactNode;
}

export function Image({ name, label, ...rest }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();
  const value = router.query[name];

  useEffect(() => {
    if (!value) {
      return;
    }

    setPreview(value as string);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    if (!e.target.files || !e.target.files[0])
      return

    const file = e.target.files[0]

    if (file.size > 10_000_000) 
      return setError("A imagem só pode ter até 10 MB até tamanho!")

    displayFile(file)
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLLabelElement>  ) => {
    setIsDragging(true)
  }

  const handleOnDragLeave = (e: React.DragEvent<HTMLLabelElement>  ) => {
    setIsDragging(false)
  }

  const handleOnDrop = (e: React.DragEvent<HTMLLabelElement>  ) => {
    setError("")
    setIsDragging(false)

    if (!e.dataTransfer.files || !e.dataTransfer.files[0])
      return

    const file = e.dataTransfer.files[0]
    
    if (file.size > 10_000_000) 
      return setError("A imagem só pode ter até 10 MB até tamanho!")

    displayFile(file)
  }

  const displayFile = (file: File) => {
    setFile(file);

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    const URLparams = new URL(document.location.toString()).searchParams;
    URLparams.set(name, objectUrl);
    router.replace("/rings/create?" + URLparams.toString());
  }

  const handleUpload = async () => {
    // We will fill this out later
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <span>{label} {rest.required && "*"}</span>

        <label 
          htmlFor={name} 
          onDragOver={handleOnDragOver} 
          onDragLeave={handleOnDragLeave} 
          onDrop={handleOnDrop}
          className={`relative flex items-center justify-center outline-dashed ${isDragging ? "outline-primary-400" : "outline-neutral-300"} aspect-[4/3] rounded-lg bg-neutral-950 duration-150`}
        >
            <img src={preview} className={`${!preview ? "hidden" : ""} w-[calc(100%-1rem)] aspect-[4/3] rounded-md object-cover ${isDragging ? "brightness-50" : "brightness-100"} duration-150`} />
            <div className={`${!preview ? "" : "hidden"} flex flex-col items-center justify-center text-neutral-300 text-center`}>
              <svg 
                className="w-12 h-12 fill-neutral-300" 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                  <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
              </svg>
              <p><span className="text-primary-400">Arraste e solte uma imagem</span> ou clique</p>
              <p className="text-xs text-neutral-400">PNG, JPG, JPEG de até 10 MB</p>
            </div>
            <input
              type="file"
              id={name}
              name={name}
              accept=".png, .jpg, .jpeg"
              className="absolute inset-0 w-full h-full opacity-0 z-50"
              onChange={handleFileChange}
            />
        </label>
        <small className={`${!error ? "hidden" : "text-warning-200"} `}>{error}</small>
      </div>
    </>
  );
}
