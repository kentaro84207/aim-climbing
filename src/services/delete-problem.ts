import firebase from 'firebase/app';
import 'firebase/storage';
import { collectionName } from './constants';

const deleteProblem = async (db: firebase.firestore.Firestore, pid: string) => {
  db.collection(collectionName.problems)
    .doc(pid)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
};

export default deleteProblem;
