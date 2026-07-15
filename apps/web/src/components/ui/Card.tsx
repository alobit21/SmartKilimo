import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div 
      className={twMerge(
        'bg-white rounded-[var(--radius-card)] p-4 border border-gray-100',
        'shadow-[var(--shadow-soft-lift)]',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};
