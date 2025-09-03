// src/app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('onboarder_user') : null;
    if (raw) setUser(JSON.parse(raw));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <p>Welcome back, <strong>{user.name || user.email}</strong></p>
      ) : (
        <p>You are not logged in. <Link href="/login" className="text-blue-600">Login</Link></p>
      )}
    </div>
  );
}
