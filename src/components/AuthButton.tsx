import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthButtonProps {
  className?: string;
  signInText?: string;
  signOutText?: string;
}

export default function AuthButton({
  className = '',
  signInText = 'Sign In with Google',
  signOutText = 'Sign Out',
}: AuthButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  if (user) {
    return (
      <button onClick={signOutUser} className={className}>
        {signOutText}
      </button>
    );
  }

  return (
    <button onClick={signIn} className={className}>
      {signInText}
    </button>
  );
}
