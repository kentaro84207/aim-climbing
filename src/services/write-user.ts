import firebase from 'firebase/app';
import { isEmpty } from 'lodash';
import { User, blankUser } from './models/user';
import { collectionName } from './constants';

const writeUser = async (db: firebase.firestore.Firestore, firebaseUser: firebase.User) => {
  const id = firebaseUser.uid;
  const { displayName } = firebaseUser;

  if (!displayName) {
    throw new Error('Invalid credential information.');
  }

  let theUser: User | null = null;
  const batch = db.batch();
  const userDoc = await db
    .collection(collectionName.users)
    .doc(id)
    .get();

  if (userDoc.exists) {
    const user = userDoc.data() as User;
    const diff: Partial<User> = {};
    if (user.displayName !== displayName) {
      diff.displayName = displayName;
    }
    if (!isEmpty(diff)) {
      batch.update(userDoc.ref, {
        ...diff,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    theUser = { ...diff, ...user, id: userDoc.id };
  } else {
    const user: User = {
      ...blankUser,
      displayName,
    };
    batch.set(userDoc.ref, {
      ...user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    theUser = { ...user, id: userDoc.id };
  }
  await batch.commit();

  return theUser;
};

export default writeUser;
