/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useRef, useState } from 'react';
import { collectionName } from 'services/constants';
import { FirebaseContext } from 'contexts';

const useUsersName = (uids: string[]) => {
  const [userNames, setUserNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');
    const collection = db.collection(collectionName.users);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await collection.get();
        const names: string[] = [];
        snap.docs.forEach(doc => {
          if (uids.includes(doc.id)) {
            names.push(doc.data().displayName);
          }
        });
        setUserNames(names);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, [uids]);

  return { userNames, loading, error };
};

export default useUsersName;
