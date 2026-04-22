import React from 'react';

const PRIORITY_COLORS = { low: '#6b7280', medium: '#2563eb', high: '#d97706', urgent: '#dc2626' };
const STATUSES = ['todo', 'in_progress', 'in_review', 'done'];

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const { id, title, description, status, priority, due_date } = task;
  const overdue = due_date && new Date(due_date) < new Date() && status !== 'done';

  return (
    <li className={`task-card priority-${priority} ${overdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <span className="task-title">{title}</span>
        <span className="task-priority" style={{ color: PRIORITY_COLORS[priority] }}>{priority}</span>
      </div>
      {description && <p className="task-description">{description}</p>}
      <div className="task-footer">
        <select
          value={status}
          onChange={e => onStatusChange(id, e.target.value)}
        >
          {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
        {due_date && (
          <span className={`task-due ${overdue ? 'overdue' : ''}`}>
            Due {new Date(due_date).toLocaleDateString()}
          </span>
        )}
        <button className="delete-btn" onClick={() => onDelete(id)}>×</button>
      </div>
    </li>
  );
}
