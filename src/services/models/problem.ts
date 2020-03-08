import { firestore } from 'firebase/app';

export type Problem = {
  id?: string;
  settedBy: string;
  grade: number;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankProblem: Problem = {
  settedBy: '',
  grade: 0,
  createdAt: null,
  updatedAt: null,
};
