import firebase from 'firebase/app';
import 'firebase/storage';
import { isEmpty } from 'lodash';
import { Problem, blankProblem } from './models/problem';
import { collectionName } from './constants';

const writeProblem = async (
  db: firebase.firestore.Firestore,
  newProblem: Problem,
  pid?: string,
) => {
  let theProblem: Problem | null = null;
  const batch = db.batch();
  const { name, grade, other } = newProblem;

  if (pid) {
    const problemDoc = await db
      .collection(collectionName.problems)
      .doc(pid)
      .get();
    const prevProblem = problemDoc.data() as Problem;
    const diff: Partial<Problem> = {};
    if (prevProblem.name !== name) diff.name = name;
    if (prevProblem.grade !== grade) diff.grade = grade;
    if (prevProblem.other !== other) diff.other = other;
    if (!isEmpty(diff)) {
      batch.update(problemDoc.ref, {
        ...diff,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    theProblem = { ...diff, ...prevProblem, id: problemDoc.id };
  } else {
    const problemDoc = db.collection(collectionName.problems).doc();
    const problem: Problem = {
      ...blankProblem,
      ...newProblem,
    };
    batch.set(problemDoc, {
      ...problem,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    theProblem = { ...problem, id: problemDoc.id };
  }
  await batch.commit();

  return theProblem;
};

export default writeProblem;
