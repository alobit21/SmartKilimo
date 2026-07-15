import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Ndio, Endelea',
  cancelText = 'Hapana, Ghairi',
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 99999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}
      >
        <div className="p-6">
          <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl">help</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface mb-2">{title}</h2>
          <p className="text-on-surface-variant mb-8">{message}</p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-full font-label-lg text-primary hover:bg-surface-container-high transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-lg hover:bg-secondary transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {isLoading ? 'Inasubiri...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
