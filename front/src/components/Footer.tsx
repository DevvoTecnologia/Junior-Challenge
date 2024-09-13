import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa6';
import { Bounce, toast } from 'react-toastify';
import { z } from 'zod';

export default function Footer() {
  const [email, setEmail] = useState<string>('');
  const emailFooterSchema = z.string().email();

  function emailAlert() {
    try {
      emailFooterSchema.parse(email);
      toast.success('Email cadastrado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Por favor, insira um email válido.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    }
  }

  return (
    <div className="min-w-[50%] flex justify-between px-16 items-center h-[400px] border-b-2 border-gray bg-gray p-5 text-left text-mainTextColor">
      <div className="flex flex-col gap-3">
        <div className="font-semibold text-lg">About</div>
        <p className="w-[280px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>
        <div>
          <p className="font-semibold ">
            Email: <span className="font-normal">lucaslevingston94@gmail.com</span>
          </p>
          <p className="font-semibold ">
            Telefone: <span className="font-normal">(83) 99961-6220</span>
          </p>
        </div>
      </div>
      <div className="gap-3 flex flex-col">
        <p className="font-semibold">Quick Link</p>
        <ul className="space-y-1">
          <li>Home</li>
          <li>About</li>
          <li>Blog</li>
          <li>Archived</li>
          <li>Author</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="gap-3 flex flex-col">
        <p className="font-semibold">Category</p>
        <ul className="space-y-1">
          <li>Lifestyle</li>
          <li>Technology</li>
          <li>Travel</li>
          <li>Business</li>
          <li>Economy</li>
          <li>Sports</li>
        </ul>
      </div>
      <div className="rounded-xl w-96 h-64 bg-white flex flex-col items-center p-5 gap-4">
        <p className="font-bold text-xl">Weekly Newsletter</p>
        <p className="text-base">Receba novidades no seu email</p>
        <div className="relative w-[320px]">
          <input
            placeholder="Seu email"
            className="w-full bg-white rounded-lg border border-gray-300 p-2 pr-10"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <FaEnvelope size={20} />
          </span>
        </div>
        <button
          className="relative w-[320px] h-12 flex items-center 
        justify-center bg-blue-600 rounded-lg text-white"
          onClick={emailAlert} // Chama a função diretamente
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
