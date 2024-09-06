'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../../firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white bg-opacity-80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Outio
          </Link>
          <nav>
            <button
              onClick={() => auth.signOut()}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user.displayName}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Culture Profile</h2>
            <p className="text-gray-600 mb-4">
              Your organization's current culture profile based on recent
              surveys.
            </p>
            {/* Here you would add a component to visualize the culture profile */}
            <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
              Culture Profile Visualization
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Pulse Survey</h2>
            <p className="text-gray-600 mb-4">
              Conduct regular pulse surveys to keep your culture profile
              up-to-date.
            </p>
            <Link
              href="/survey"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Start New Survey
            </Link>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              Hiring Recommendations
            </h2>
            <p className="text-gray-600 mb-4">
              Tailored interview questions and evaluation criteria based on your
              culture profile.
            </p>
            {/* Here you would add a component to display hiring recommendations */}
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Sample Interview Question:</h3>
              <p>
                "Describe a situation where you had to adapt to a different work
                culture. How did you handle it?"
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
