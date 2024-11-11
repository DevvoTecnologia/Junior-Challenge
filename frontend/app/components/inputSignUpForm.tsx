"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { TypingText } from "./customTexts";

export default function InputSignUpFormComponent() {
  return (
    <div className="">
      <div className="flex h-screen justify-center">
        <div className="hidden bg-cover lg:block lg:w-2/3"></div>

        <div className="mx-auto flex items-center border-l border-blue-300 bg-slate-900/90 px-6 max-md:bg-slate-600/30 lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="card mx-auto flex justify-center">
                <Image src="/logo.png" alt="logo" width={150} height={150} />
              </div>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                  },
                  show: (i = 1) => ({
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.01,
                      delayChildren: i * 0.001,
                    },
                  }),
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className={`flex flex-col`}
              >
                <TypingText
                  title="Crie e desenvolva sua criatividade e anéis poderosos!"
                  textStyles="w-full bg-gradient-to-r my-3 max-md:from-[#FFFFFF] max-md:to-[#4de8fc] from-[#0990a8] to-[#4de8fc] bg-clip-text  font-medium text-transparent max-[300px]:hidden"
                />
              </motion.div>
            </div>

            <div className="mt-8">
              <form>
                <div>
                  <label className="dark:text-gray- mb-2 block text-sm text-gray-400">
                    Endereço de E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-300 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between">
                    <label className="dark:text-gray- text-sm text-gray-400">
                      Senha
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-400 hover:text-blue-500 hover:underline focus:text-blue-500"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Digite sua senha"
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-300 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  />
                </div>

                <div className="mt-6">
                  <a
                    href="/pages/cards"
                    className="flex w-full transform justify-center rounded-lg bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Criar Conta
                  </a>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-gray-100">
                Já tem uma conta?{" "}
                <a
                  href="/pages/signin"
                  className="font-bold text-blue-500 hover:underline focus:underline focus:outline-none"
                >
                  Fazer Login
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
