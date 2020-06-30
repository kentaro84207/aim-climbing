/* eslint-disable no-console */
import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { format } from 'date-fns';
import { collectionName } from './services/constants';
import { User } from './services/models/user';
import { Problem } from './services/models/problem';

admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const updateMonthScore = functions
  .region('asia-northeast1')
  .firestore.document('users/{uid}/problems/{pid}')
  .onWrite(async (change, context) => {
    const { uid, pid } = context.params;
    const userRef = db.collection(collectionName.users).doc(uid);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data() as User;

    const problemRef = db.collection(collectionName.problems).doc(pid);
    const problemSnapshot = await problemRef.get();
    const problemData = problemSnapshot.data() as Problem;

    if (!userData || !problemData) return;

    const problemPoint = change.after.exists
      ? Number(problemData.point)
      : -1 * Number(problemData.point);
    const thisMonth = format(new Date().getTime() + 1000 * 60 * 60 * 9, 'yyyyMM');
    const currentScore =
      userData.scores && userData.scores[thisMonth] ? Number(userData.scores[thisMonth]) : 0;
    const newScore = currentScore + problemPoint;
    const batch = db.batch();
    batch.update(userRef, {
      scores: {
        [thisMonth]: newScore,
      },
    });
    await batch.commit();
    console.log(newScore);
  });

export const updateScore = functions
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
    const currentScore = Number(userData.score);
    const newScore = currentScore + problemPoint;
    const batch = db.batch();
    batch.update(userRef, {
      score: newScore,
    });
    await batch.commit();
    console.log(newScore);
  });
