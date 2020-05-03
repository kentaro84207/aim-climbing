import { firestore } from 'firebase/app';

export type User = {
  id?: string;
  displayName: string;
  problems: string[];
  points: string;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankUser: User = {
  displayName: '',
  problems: [],
  points: '0',
  createdAt: null,
  updatedAt: null,
};
