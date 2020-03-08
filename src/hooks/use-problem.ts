/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useRef, useState } from 'react';

import { Problem } from 'services/models/problem';
import { collectionName } from 'services/constants';
import { FirebaseContext } from 'contexts';

const useProblem = (id: string) => {
  const [problem, setProblem] = useState<Problem>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');
    const collection = db.collection(collectionName.problems);

    const load = async () => {
      setLoading(true);
      try {
        const doc = await collection.doc(id).get();
        const problemData = doc.data() as Problem;
        setProblem({ ...problemData, id: doc.id });
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, [id]);

  return { problem, loading, error };
};

export default useProblem;
