export const Role = {
  ADMIN: 'ADMIN',
  FARMER: 'FARMER',
  BUYER: 'BUYER',
  OFFICER: 'OFFICER',
} as const;

export type Role = typeof Role[keyof typeof Role];

export const RequestStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
} as const;

export type RequestStatus = typeof RequestStatus[keyof typeof RequestStatus];

// Re-using RequestStatus for both Deals and Advisory Requests as they have the same states.
export const DealStatus = RequestStatus;
export type DealStatus = RequestStatus;

export const AdvisoryStatus = RequestStatus;
export type AdvisoryStatus = RequestStatus;
