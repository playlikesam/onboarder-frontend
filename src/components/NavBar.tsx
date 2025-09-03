// src/components/NavBar.tsx
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('onboarder_user') : null;
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function logout() {
    if (typeof window !== 'undefined') localStorage.removeItem('onboarder_user');
    router.push('/login');
  }

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/" className="font-bold">Onboarder</Link>
        <Link href="/dashboard" className="hidden md:inline">Dashboard</Link>
        <Link href="/customers" className="hidden md:inline">Customers</Link>
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.name ?? user.email}</span>
            <button onClick={logout} className="bg-white text-black px-3 py-1 rounded">Logout</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="px-3 py-1 border rounded">Login</Link>
            <Link href="/register" className="px-3 py-1 bg-white text-black rounded">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
