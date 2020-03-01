import { firestore } from 'firebase/app';

export type User = {
  id?: string;
  displayName: string | null;
  provider: string | null;
  providerUid: string | null;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankUser: User = {
  displayName: null,
  provider: '',
  providerUid: '',
  createdAt: null,
  updatedAt: null,
};
