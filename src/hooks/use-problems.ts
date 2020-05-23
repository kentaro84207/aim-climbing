/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useRef, useState } from 'react';

import { Problem } from 'services/models/problem';
import { collectionName } from 'services/constants';
import { FirebaseContext } from 'contexts';

type problemsOptions = {
  limit?: number;
};
const defaultOptions: problemsOptions = {
  limit: 30,
};

const useProblems = (options?: problemsOptions) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');
    const query = db
      .collection(collectionName.problems)
      .orderBy('createdAt', 'desc')
      .limit(optionsRef.current.limit!);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const problemsData = snap.docs.map(doc => ({
          ...(doc.data() as Problem),
          id: doc.id,
        }));
        setProblems(problemsData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { problems, loading, error };
};

export default useProblems;
