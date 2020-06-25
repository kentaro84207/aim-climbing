import { firestore } from 'firebase/app';

export type Problem = {
  id?: string;
  setterId?: string;
  setterName?: string;
  name: string;
  grade: number;
  other?: string;
  imageURL: string;
  users: string[];
  point: number;
  wall: number;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const blankProblem: Problem = {
  grade: 0,
  name: '',
  other: '',
  imageURL: '',
  users: [],
  point: 0,
  wall: 0,
  createdAt: null,
  updatedAt: null,
};
