/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useRef, useState } from 'react';

import { User } from 'services/models/user';
import { collectionName } from 'services/constants';
import { FirebaseContext } from 'contexts';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');
    const query = db.collection(collectionName.users);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const usersData = snap.docs.map(doc => ({
          ...(doc.data() as User),
          id: doc.id,
        }));
        setUsers(usersData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { users, loading, error };
};

export default useUsers;
