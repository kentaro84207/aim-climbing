import React, { FC, useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import findUser from 'services/find-user';
import { User } from 'services/models/user';
import { FirebaseContext, UserContext } from 'contexts';

const FirebaseApp: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credential, setCredential] = useState<firebase.auth.UserCredential | null>(null);
  const counterRef = useRef(0);
  const auth = firebase.auth();
  const db = firebase.firestore();

  const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
    if (firebaseUser && counterRef.current === 1 && !user) {
      const theUser = await findUser(db, firebaseUser.uid);
      setUser(theUser);
    }
  });

  useEffect(() => {
    counterRef.current += 1;

    return unsubscribe;
  });

  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      <UserContext.Provider value={{ user, credential, setCredential }}>
        {children}
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseApp;
