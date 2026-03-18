import { useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  labelButton?: string;
}

export default function Modal({ children, title, labelButton }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300">
      {/* Container principal do modal com animação de entrada. */}
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-in-out scale-100">
        {/* Cabeçalho do Modal */}
        <div className="flex items-start justify-between pb-4 border-b rounded-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {title || "Título Padrão"}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer"
            onClick={handleClose}
            aria-label="Fechar modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Corpo do Modal - aqui o conteúdo de 'children' é renderizado. */}
        <div className="py-6 space-y-4">{children}</div>

        {/* Rodapé do Modal com o botão 'Concordo'. */}
        {labelButton && (
          <div className="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b">
            <button
              onClick={handleClose}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              {labelButton}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
