import { FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-[90rem] mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            Artefatos Mágicos
          </h2>
          <p className="text-lg mb-4">
            Em uma terra distante, onde o poder dos artefatos molda o destino
            dos reinos, unimos forças para preservar e explorar a magia.
          </p>
          <div className="flex flex-col md:flex-row md:justify-center gap-4">
            <Link to="/" className="text-gray-300 hover:text-gray-100">
              Início
            </Link>
            <Link to="/" className="text-gray-300 hover:text-gray-100">
              Sobre
            </Link>
            <Link
              to="https://gustavohenrique.vercel.app"
              className="text-gray-300 hover:text-gray-100"
            >
              Contato
            </Link>
          </div>
          <div className="mt-6">
            <Button variant="secondary" asChild>
              <a
                href="https://github.com/Gustavohps10/Junior-Challenge"
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub className="mr-2 w-5 h-5" />
                Contribua para o Código
              </a>
            </Button>
          </div>
          <div className="mt-8 text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Hub de Artefatos Mágicos. Todos os
            direitos reservados.
            <br /> Made with 💙 by Gustavo Henrique.
          </div>
        </div>
      </div>
    </footer>
  )
}
