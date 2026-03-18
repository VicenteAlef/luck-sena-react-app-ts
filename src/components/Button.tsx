import React, { type ButtonHTMLAttributes } from 'react';

// Definimos uma interface que estende os atributos nativos do botão
// Isso permite que o componente aceite 'onClick', 'type', 'disabled', etc.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; // Permitimos sobrescrever ou adicionar estilos
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`
        bg-cyan-800 
        hover:bg-cyan-900 
        transition-colors 
        cursor-pointer
        p-2 
        px-6 
        rounded-2xl 
        text-white 
        mt-auto 
        h-11 
        ${className || ''}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
