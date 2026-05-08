import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Plus, Pencil, Trash2, RefreshCw, X, Save,
  FolderOpen, Wrench, Trophy, BookOpen, Users, MessageSquare,
} from 'lucide-react';

type Tab = 'Projects' | 'Services' | 'Achievements' | 'Certifications' | 'Memberships' | 'Messages';

const TABS: { label: Tab; icon: React.ReactNode }[] = [
  { label: 'Projects',       icon: <FolderOpen className="w-4 h-4" /> },
  { label: 'Services',       icon: <Wrench className="w-4 h-4" /> },
  { label: 'Achievements',   icon: <Trophy className="w-4 h-4" /> },
  { label: 'Certifications', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Memberships',    icon: <Users className="w-4 h-4" /> },
  { label: 'Messages',       icon: <MessageSquare className="w-4 h-4" /> },
];

const TABLE_MAP: Record<Tab, string> = {
  Projects:       'projects',
  Services:       'services',
  Achievements:   'achievements',
  Certifications: 'certifications',
  Memberships:    'memberships',
  Messages:       'contact_messages',
};

// Minimal field configs for each table
const FIELDS: Record<Tab, { key: string; label: string; type?: string; textarea?: boolean }[]> = {
  Projects: [
    { key: 'title',         label: 'Title' },
    { key: 'details',       label: 'Description', textarea: true },
    { key: 'date',          label: 'Date' },
    { key: 'tech_stack',    label: 'Tech Stack (comma-separated)' },
    { key: 'github_link',   label: 'GitHub URL' },
    { key: 'demo_link',     label: 'Demo URL' },
    { key: 'image_url',     label: 'Image URL' },
    { key: 'category',      label: 'Category' },
    { key: 'highlights',    label: 'Highlights (comma-separated)' },
    { key: 'display_order', label: 'Display Order', type: 'number' },
  ],
  Services: [
    { key: 'title',         label: 'Title' },
    { key: 'description',   label: 'Description', textarea: true },
    { key: 'price',         label: 'Price (₹)', type: 'number' },
    { key: 'features',      label: 'Features (comma-separated)' },
    { key: 'feedbacks',     label: 'Feedbacks (comma-separated)' },
    { key: 'image_urls',    label: 'Image URLs (comma-separated)' },
    { key: 'display_order', label: 'Display Order', type: 'number' },
  ],
  Achievements: [
    { key: 'title',         label: 'Title' },
    { key: 'description',   label: 'Description', textarea: true },
    { key: 'year',          label: 'Year' },
    { key: 'organization',  label: 'Organization' },
    { key: 'display_order', label: 'Display Order', type: 'number' },
  ],
  Certifications: [
    { key: 'name',           label: 'Name' },
    { key: 'issuer',         label: 'Issuer' },
    { key: 'year',           label: 'Year' },
    { key: 'credential_url', label: 'Credential URL' },
    { key: 'display_order',  label: 'Display Order', type: 'number' },
  ],
  Memberships: [
    { key: 'role',           label: 'Role' },
    { key: 'organization',   label: 'Organization' },
    { key: 'duration',       label: 'Duration' },
    { key: 'display_order',  label: 'Display Order', type: 'number' },
  ],
  Messages: [], // read-only
};

// Array fields that come as comma-separated strings in the form
const ARRAY_FIELDS = ['tech_stack', 'highlights', 'features', 'feedbacks', 'image_urls'];

function toFormValue(key: string, value: unknown): string {
  if (ARRAY_FIELDS.includes(key) && Array.isArray(value)) return value.join(', ');
  return value != null ? String(value) : '';
}

function fromFormValue(key: string, value: string): unknown {
  if (ARRAY_FIELDS.includes(key)) {
    return value.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return value;
}

// API helper — proxies through /api/admin-data
async function adminFetch(method: string, table: string, body?: unknown, id?: string) {
  const token = sessionStorage.getItem('admin_token') ?? '';
  const url = `/api/admin-data?table=${table}${id ? `&id=${id}` : ''}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ── Row form modal ──────────────────────────────────────────────────────────
const RowModal: React.FC<{
  tab: Tab;
  initial: Record<string, unknown> | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onClose: () => void;
}> = ({ tab, initial, onSave, onClose }) => {
  const fields = FIELDS[tab];
  const [form, setForm] = useState<Record<string, string>>(() => {
    const base: Record<string, string> = {};
    fields.forEach((f) => {
      base[f.key] = initial ? toFormValue(f.key, initial[f.key]) : '';
    });
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErr('');
    try {
      const payload: Record<string, unknown> = {};
      fields.forEach((f) => {
        payload[f.key] = fromFormValue(f.key, form[f.key]);
      });
      await onSave(payload);
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Save failed');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">{initial ? 'Edit' : 'Add'} {tab.slice(0, -1)}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {fields.map((f) =>
            f.textarea ? (
              <div key={f.key}>
                <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
                <textarea
                  rows={3}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>
            ) : (
              <div key={f.key}>
                <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
                <input
                  type={f.type ?? 'text'}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
            )
          )}
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// ── Main Dashboard ──────────────────────────────────────────────────────────
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('Projects');
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/admin');
  }, [navigate]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminFetch('GET', TABLE_MAP[activeTab]);
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      showToast(`Load error: ${e instanceof Error ? e.message : 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async (payload: Record<string, unknown>) => {
    const table = TABLE_MAP[activeTab];
    if (editing) {
      await adminFetch('PATCH', table, payload, editing.id as string);
      showToast('Updated successfully!');
    } else {
      await adminFetch('POST', table, payload);
      showToast('Added successfully!');
    }
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await adminFetch('DELETE', TABLE_MAP[activeTab], undefined, id);
      showToast('Deleted.');
      await loadData();
    } catch (e) {
      showToast(`Delete failed: ${e instanceof Error ? e.message : 'Unknown'}`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_token');
    navigate('/admin');
  };

  // Columns to show per tab (first 3 meaningful fields)
  const previewKeys: Record<Tab, string[]> = {
    Projects:       ['title', 'category', 'date'],
    Services:       ['title', 'price', 'display_order'],
    Achievements:   ['title', 'year', 'organization'],
    Certifications: ['name', 'issuer', 'year'],
    Memberships:    ['role', 'organization', 'duration'],
    Messages:       ['name', 'email', 'created_at'],
  };

  const cols = previewKeys[activeTab];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-cyan-400">Portfolio Admin</h1>
          <p className="text-xs text-gray-500 hidden sm:block">Manage your content</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 hover:bg-red-900/50 text-gray-300 hover:text-red-400 text-sm transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1.5 flex-wrap mb-6">
          {TABS.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === label
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-xl font-bold text-white">{activeTab}</h2>
          <div className="flex gap-2">
            <button onClick={loadData} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            {activeTab !== 'Messages' && (
              <button
                onClick={() => { setEditing(null); setModalOpen(true); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" /> Add New
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-4xl mb-3">📭</p>
            <p>No {activeTab.toLowerCase()} found.</p>
            {activeTab !== 'Messages' && (
              <button onClick={() => { setEditing(null); setModalOpen(true); }} className="mt-4 px-4 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-sm">
                Add your first {activeTab.slice(0, -1).toLowerCase()}
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800">
                  {cols.map((c) => (
                    <th key={c} className="text-left px-4 py-3 text-gray-400 font-medium capitalize text-xs uppercase tracking-wider">
                      {c.replace(/_/g, ' ')}
                    </th>
                  ))}
                  {activeTab !== 'Messages' && (
                    <th className="px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider text-right">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id as string ?? i} className="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors">
                    {cols.map((c) => (
                      <td key={c} className="px-4 py-3 text-gray-300 max-w-[200px] truncate">
                        {Array.isArray(row[c])
                          ? (row[c] as string[]).join(', ')
                          : String(row[c] ?? '—')}
                      </td>
                    ))}
                    {activeTab !== 'Messages' && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditing(row); setModalOpen(true); }}
                            className="p-1.5 rounded-lg bg-gray-800 hover:bg-cyan-900/50 text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id as string)}
                            className="p-1.5 rounded-lg bg-gray-800 hover:bg-red-900/50 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Row modal */}
      <AnimatePresence>
        {modalOpen && activeTab !== 'Messages' && (
          <RowModal
            tab={activeTab}
            initial={editing}
            onSave={handleSave}
            onClose={() => { setModalOpen(false); setEditing(null); }}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm shadow-xl z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
