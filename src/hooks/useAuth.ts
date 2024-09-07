import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (!user && !loading) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return { user, loading };
}
