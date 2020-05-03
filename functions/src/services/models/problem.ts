import { firestore } from 'firebase/app';

export type Problem = {
  id?: string;
  setterId?: string;
  setterName?: string;
  name: string;
  grade: string;
  other?: string;
  imageURL: string;
  users: string[];
  point: string;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankProblem: Problem = {
  grade: '',
  name: '',
  other: '',
  imageURL: '',
  users: [],
  point: '',
  createdAt: null,
  updatedAt: null,
};
