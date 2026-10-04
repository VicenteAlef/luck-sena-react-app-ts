import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  labelButton?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Modal({
  children,
  title,
  labelButton,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: ModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);

  const isModalOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  if (!isModalOpen) {
    return null;
  }

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg p-6 bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-800 transform transition-all text-slate-800 dark:text-slate-200">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <h3
            id="modal-title"
            className="text-xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {title || 'Informação'}
          </h3>
          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={handleClose}
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="py-5 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {children}
        </div>

        {/* Rodapé do Modal */}
        {labelButton && (
          <div className="flex items-center justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleClose}
              type="button"
              className="px-5 py-2.5 rounded-md font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
            >
              {labelButton}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
