"use client";

import Image from "next/image";

import axios from "axios";
import CardComponent from "./card";
import InputComponent from "./input";
import SelectComponent from "./select";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface CardsProps {
  ring: string;
  power: number;
  proper: string;
  blacksmith: string;
}

export default function InputRingCommponent() {
  const router = useRouter();

  const createRing = (values: CardsProps) => {
    axios.defaults.baseURL = "http://localhost:3000";

    axios
      .post(
        "/cards",
        {
          ring: values.ring,
          power: values.power,
          proper: values.proper,
          blacksmith: values.blacksmith,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then(() => {
        router.push("/pages/cards");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const schema = Yup.object().shape({
    ring: Yup.string()
      .max(15, "O máximo de caracteres é até 15.")
      .required("O campo do Nome do Anel é obrigatório."),
    power: Yup.number().required("O campo de Poder é obrigatório."),
    proper: Yup.string()
      .max(12, "O máximo de caracteres é até 12.")
      .required("O campo de Portador é obrigatório."),
    blacksmith: Yup.string().required("O campo do Forjeiro é obrigatório."),
  });

  const handleSubmit = (values: CardsProps) => {
    createRing({
      ring: values.ring,
      power: values.power,
      proper: values.proper,
      blacksmith: values.blacksmith,
    });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        ring: "",
        power: 0,
        proper: "",
        blacksmith: "",
      }}
    >
      {({ handleChange, values, errors, touched, handleSubmit }) => (
        <div className="flex h-screen justify-center">
          <div className="flex items-center justify-center bg-cover lg:w-2/3">
            <CardComponent
              ring={values.ring}
              power={values.power}
              proper={values.proper}
              blacksmith={values.blacksmith}
            />
          </div>
          <div className="mx-auto flex w-full items-center bg-slate-900/90 px-6 lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="mx-auto flex justify-center">
                  <Image src="/logo.png" alt="logo" width={150} height={150} />
                </div>

                <p className="mt-3 text-amber-500 dark:text-amber-300">
                  Crie e desenvolva sua criatividade e anéis poderosos!
                </p>
              </div>

              <div className="mt-8">
                <form>
                  <InputComponent
                    id="ring"
                    label="Nome do Anel"
                    placeholder="Escolha o nome do Anel"
                    value={values.ring}
                    errors={errors.ring}
                    touched={touched.ring}
                    onChange={handleChange}
                  />
                  <InputComponent
                    id="power"
                    label="Poder"
                    placeholder="Escolha o nível do Poder"
                    value={values.power}
                    errors={errors.power}
                    touched={touched.power}
                    onChange={handleChange}
                  />
                  <InputComponent
                    id="proper"
                    label="Nome do Portador"
                    placeholder="Quem é o portador do Anel?"
                    value={values.proper}
                    errors={errors.proper}
                    touched={touched.proper}
                    onChange={handleChange}
                  />
                  <SelectComponent
                    id="blacksmith"
                    label="Quem é o Ferreiro?"
                    value={values.blacksmith}
                    errors={errors.blacksmith}
                    touched={touched.blacksmith}
                    onChange={handleChange}
                  />
                  <div className="mt-6">
                    <a
                      onClick={() => {
                        handleSubmit();
                      }}
                      className="flex w-full flex-1 transform cursor-pointer justify-center rounded-lg bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Forjar Anel
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
