"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { TypingText } from "./customTexts";

export default function InputFormComponent() {
  return (
    <div className="flex h-screen justify-center">
      <div className="hidden bg-cover lg:block lg:w-2/3"></div>
      <div className="bg-slate-900/90 max-md:bg-slate-600/30 max-md:px-10 mx-auto flex items-center border-l border-amber-300 lg:w-2/6 lg:px-6">
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
                textStyles="w-full bg-gradient-to-r my-3 max-md:from-[#fff2c5] max-md:to-[#ffd752] from-[#ffd752] to-[#d8ad21] bg-clip-text  font-medium text-transparent max-[300px]:hidden"
              />
            </motion.div>
          </div>

          <div className="mt-8">
            <form>
              <div>
                <label className="text-gray- mb-2 block text-sm text-gray-200">
                  Endereço de E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-gray-300 px-4 py-2 text-gray-700 placeholder-gray-600 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between">
                  <label className="block text-sm text-gray-200">Senha</label>
                  <a
                    href="#"
                    className="max-md:text-blue-600 text-sm text-blue-400 hover:text-blue-500 hover:underline focus:text-blue-500"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Digite sua senha"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-gray-300 px-4 py-2 text-gray-700 placeholder-gray-600 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
                />
              </div>

              <div className="mt-6">
                <a
                  href="/pages/cards"
                  className="flex w-full transform justify-center rounded-lg bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Entrar
                </a>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-100">
              Ainda não tem uma conta?{" "}
              <a
                href="/pages/signup"
                className="font-bold text-blue-500 hover:underline focus:underline focus:outline-none"
              >
                Criar uma Conta
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
