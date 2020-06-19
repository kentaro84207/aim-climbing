import firebase from 'firebase/app';
import 'firebase/storage';
import { collectionName } from './constants';

const switchMouse = async (db: firebase.firestore.Firestore, uid: string, mouse: boolean) => {
  const userDoc = db.collection(collectionName.users).doc(uid);
  userDoc.set(
    {
      isMouse: mouse,
    },
    { merge: true },
  );
};

export default switchMouse;
