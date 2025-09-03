// src/app/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/customers`);
      if (!res.ok) throw new Error('Failed to fetch customers');
      const customers = await res.json();
      const user = customers.find((c: any) => c.email?.toLowerCase() === email.toLowerCase());
      if (!user) {
        setError('No customer with that email found');
        return;
      }
      localStorage.setItem('onboarder_user', JSON.stringify(user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login (email only)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
          {loading ? 'Checking...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
