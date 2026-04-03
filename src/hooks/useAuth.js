import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import useUserStore from "../store/userStore";

const useAuth = () => {
  const { user, loading, setUser, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setLoading]);

  return { user, loading };
};

export default useAuth;
