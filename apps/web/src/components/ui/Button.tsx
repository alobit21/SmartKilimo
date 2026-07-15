import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-[var(--radius-button)]';
  
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:opacity-90',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-[var(--color-status-rejected)] text-white hover:opacity-90',
  };

  return (
    <button className={twMerge(clsx(baseClasses, variants[variant]), className)} {...props}>
      {children}
    </button>
  );
};
