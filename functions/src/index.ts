/* eslint-disable no-console */
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { collectionName } from './services/constants';

admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const updatePoints = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}/problems/{pid}')
  .onWrite(async (change, context) => {
    const { uid, pid } = context.params;
    const userRef = db.collection(collectionName.users).doc(uid);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    const problemRef = db.collection(collectionName.problems).doc(pid);
    const problemSnapshot = await problemRef.get();
    const problemData = problemSnapshot.data();

    if (!userData || !problemData) return;

    const problemPoint = change.after.exists
      ? Number(problemData.point)
      : -1 * Number(problemData.point);
    const currentPoints = Number(userData.points);
    const newPoints = String(currentPoints + problemPoint);
    const batch = db.batch();
    batch.update(userRef, {
      points: newPoints,
    });
    await batch.commit();
    console.log(newPoints);
  });
