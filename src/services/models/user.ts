import { firestore } from 'firebase/app';
import { getYYMM } from 'utils/getDate';

const thisYYMM = getYYMM;

export type User = {
  id?: string;
  displayName: string;
  problems: string[];
  score: number;
  scores: { [key: string]: number };
  isMouse?: boolean;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankUser: User = {
  displayName: '',
  problems: [],
  score: 0,
  scores: { [thisYYMM]: 0 },
  createdAt: null,
  updatedAt: null,
};
