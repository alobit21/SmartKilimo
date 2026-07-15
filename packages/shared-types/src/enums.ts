export enum Role {
  ADMIN = 'ADMIN',
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  OFFICER = 'OFFICER',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

// Re-using RequestStatus for both Deals and Advisory Requests as they have the same states.
export const DealStatus = RequestStatus;
export const AdvisoryStatus = RequestStatus;
