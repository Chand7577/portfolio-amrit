'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/types';

const EMPTY: Partial<Project> = {
  title: '', slug: '', description: '', longDescription: '',
  imageUrl: '/images/projects/default.jpg', liveUrl: '', githubUrl: '',
  featured: false, order: 0, category: 'fullstack', techStack: [],
};

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const load = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    if (data.projects) setProjects(data.projects);
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret) setAuthed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving…');
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/projects/${editing}` : '/api/projects';

    const body = {
      ...form,
      techStack: typeof form.techStack === 'string'
        ? (form.techStack as string).split(',').map((s) => s.trim())
        : form.techStack,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setStatus('✓ Saved!');
      setForm(EMPTY);
      setEditing(null);
      load();
    } else {
      const err = await res.json();
      setStatus(`Error: ${err.error}`);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"?`)) return;
    await fetch(`/api/projects/${slug}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret },
    });
    load();
  };

  const startEdit = (p: Project) => {
    setEditing(p.slug);
    setForm({ ...p, techStack: p.techStack });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center section-padding">
        <form onSubmit={handleAuth} className="glow-card rounded-xl p-8 w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="w-full bg-surface border border-border/60 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button type="submit" className="btn-accent w-full justify-center">Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary section-padding py-16">
      <div className="container-max max-w-5xl">
        <h1 className="text-3xl font-bold mb-10">
          Admin — <span className="text-gradient">Projects</span>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glow-card rounded-xl p-6 mb-10 space-y-4">
          <h2 className="text-lg font-semibold">{editing ? `Editing: ${editing}` : 'New Project'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(['title', 'slug', 'imageUrl', 'liveUrl', 'githubUrl'] as const).map((field) => (
              <div key={field}>
                <label className="text-xs text-text-muted uppercase tracking-wide block mb-1">{field}</label>
                <input
                  type="text"
                  value={(form[field] as string) || ''}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full bg-surface border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wide block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Project['category'] })}
                className="w-full bg-surface border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                {['fullstack', 'frontend', 'backend', 'mobile', 'other'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wide block mb-1">Order</label>
              <input
                type="number"
                value={form.order || 0}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full bg-surface border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wide block mb-1">Tech Stack (comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(form.techStack) ? form.techStack.join(', ') : ''}
              onChange={(e) => setForm({ ...form, techStack: e.target.value.split(',').map((s) => s.trim()) })}
              className="w-full bg-surface border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wide block mb-1">Description</label>
            <textarea
              rows={2}
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-surface border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
            />
          </div>
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wide block mb-1">Long Description</label>
            <textarea
              rows={4}
              value={form.longDescription || ''}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
              className="w-full bg-surface border border-border/60 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={!!form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="accent-accent"
            />
            <label htmlFor="featured" className="text-sm text-text-secondary">Featured project</label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-accent">{editing ? 'Update' : 'Create'}</button>
            {editing && (
              <button type="button" className="btn-outline" onClick={() => { setEditing(null); setForm(EMPTY); }}>
                Cancel
              </button>
            )}
            {status && <span className="text-sm text-text-secondary self-center">{status}</span>}
          </div>
        </form>

        {/* Projects table */}
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.slug} className="glow-card rounded-xl px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-xs font-mono text-text-muted">{p.slug} · {p.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="btn-outline !px-3 !py-1.5 !text-xs">Edit</button>
                <button
                  onClick={() => handleDelete(p.slug)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
