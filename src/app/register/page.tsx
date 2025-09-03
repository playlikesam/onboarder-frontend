// src/app/register/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormState = { name: string; email: string; phone?: string };

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // try to get a helpful message
        const body = await res.json().catch(() => null);
        throw new Error((body && body.message) || `Server error: ${res.status}`);
      }

      const data = await res.json();
      // store minimal session stub client-side (no real auth yet)
      localStorage.setItem('onboarder_user', JSON.stringify(data));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          placeholder="Full name"
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone (optional)"
          className="w-full p-2 border rounded"
        />

        {error && <div className="text-red-600">{error}</div>}

        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
