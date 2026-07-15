import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RequestStatus } from '@kilimosmart/shared-types';

interface StatusBadgeProps {
  status: RequestStatus | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-[var(--radius-pill)] text-xs font-medium';
  
  let statusClasses = '';
  switch (status) {
    case RequestStatus.PENDING:
      statusClasses = 'bg-[var(--color-status-pending)] text-white';
      break;
    case RequestStatus.ACCEPTED:
      statusClasses = 'bg-[var(--color-status-accepted)] text-white';
      break;
    case RequestStatus.REJECTED:
      statusClasses = 'bg-[var(--color-status-rejected)] text-white';
      break;
    default:
      statusClasses = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={twMerge(clsx(baseClasses, statusClasses), className)}>
      {status}
    </span>
  );
};
