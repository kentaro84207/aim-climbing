import firebase from 'firebase/app';
import 'firebase/storage';
import { collectionName } from './constants';

const switchAscent = async (
  db: firebase.firestore.Firestore,
  uid: string,
  pid: string,
  ascent: boolean,
) => {
  const batch = db.batch();
  const problemRef = db.collection(collectionName.problems).doc(pid);
  const userRef = db.collection(collectionName.users).doc(uid);
  const userProblemsRef = db
    .collection(collectionName.users)
    .doc(uid)
    .collection(collectionName.problems)
    .doc(pid);

  if (ascent) {
    batch.update(problemRef, {
      users: firebase.firestore.FieldValue.arrayUnion(uid),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.update(userRef, {
      problems: firebase.firestore.FieldValue.arrayUnion(pid),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.set(userProblemsRef, {
      problemRef,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await batch.commit();
  } else if (!ascent) {
    batch.update(problemRef, {
      users: firebase.firestore.FieldValue.arrayRemove(uid),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.update(userRef, {
      problems: firebase.firestore.FieldValue.arrayRemove(pid),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.delete(userProblemsRef);
    await batch.commit();
  }
};

export default switchAscent;
