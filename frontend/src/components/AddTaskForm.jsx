import React, { useState } from 'react';

const EMPTY = { title: '', description: '', priority: 'medium', due_date: '' };

export default function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Title is required');
    setSubmitting(true); setError(null);
    try {
      await onAdd({
        ...form,
        due_date: form.due_date || null,
      });
      setForm(EMPTY);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input placeholder="Task title" value={form.title} onChange={set('title')} />
      <textarea placeholder="Description (optional)" value={form.description} onChange={set('description')} rows={2} />
      <div className="form-row">
        <select value={form.priority} onChange={set('priority')}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <input type="date" value={form.due_date} onChange={set('due_date')} />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add task'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
