import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import AddTaskForm from './components/AddTaskForm.jsx';
import { fetchTasks, createTask, updateTask, deleteTask } from './utils/api.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (task) => {
    const created = await createTask(task);
    setTasks(prev => [created, ...prev]);
  };

  const handleStatusChange = async (id, status) => {
    const updated = await updateTask(id, { status });
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const visible = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div className="app">
      <header>
        <h1>TaskFlow</h1>
        <nav>
          {['all', 'todo', 'in_progress', 'in_review', 'done'].map(f => (
            <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>
              {f.replace('_', ' ')}
            </button>
          ))}
        </nav>
      </header>
      <main>
        <AddTaskForm onAdd={handleAdd} />
        {loading && <p>Loading…</p>}
        {error && <p className="error">{error}</p>}
        <TaskList tasks={visible} onStatusChange={handleStatusChange} onDelete={handleDelete} />
      </main>
    </div>
  );
}
