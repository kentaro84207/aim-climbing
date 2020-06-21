import { firestore } from 'firebase/app';

export type User = {
  id?: string;
  displayName: string;
  problems: string[];
  score: number;
  scores?: { [key: string]: number };
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankUser: User = {
  displayName: '',
  problems: [],
  score: 0,
  createdAt: null,
  updatedAt: null,
};
