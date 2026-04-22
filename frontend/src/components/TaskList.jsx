import React from 'react';
import TaskCard from './TaskCard.jsx';

export default function TaskList({ tasks, onStatusChange, onDelete }) {
  if (!tasks.length) return <p className="empty">No tasks here.</p>;

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
