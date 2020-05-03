import { firestore } from 'firebase/app';

export type User = {
  id?: string;
  displayName: string;
  problems: string[];
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankUser: User = {
  displayName: '',
  problems: [],
  createdAt: null,
  updatedAt: null,
};
