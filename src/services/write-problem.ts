/* eslint-disable no-console */
import firebase from 'firebase/app';
import 'firebase/storage';
import { isEmpty } from 'lodash';
import { Problem, blankProblem } from './models/problem';
import { collectionName } from './constants';

const writeProblem = async (
  db: firebase.firestore.Firestore,
  newProblem: Problem,
  imageAsFile?: File,
  pid?: string,
) => {
  let theProblem: Problem | null = null;
  const batch = db.batch();
  const { name, grade, other } = newProblem;
  const storage = firebase.storage();

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
    await batch.commit();
  } else if (imageAsFile) {
    const problemDoc = db.collection(collectionName.problems).doc();
    let problem: Problem = {
      ...blankProblem,
      ...newProblem,
    };
    const uploadTask = storage
      .ref(`/images/${new Date().getTime().toString(16)}-${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log('default');
        }
      },
      err => {
        console.log(err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((fireBaseUrl: string) => {
          problem = {
            ...problem,
            imageURL: fireBaseUrl,
          };
          batch.set(problemDoc, {
            ...problem,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          theProblem = { ...problem, id: problemDoc.id };
          batch.commit();
        });
      },
    );
  }

  return theProblem;
};

export default writeProblem;
