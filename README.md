# TaskFlow

A lightweight task management app. REST API (Node/Express) + React frontend.

## Structure

```
src/
  api/
    index.js            Express app entry point
    routes/
      tasks.js          Task CRUD endpoints
      users.js          User management endpoints
    middleware/
      auth.js           JWT auth middleware
  db/
    schema.sql          PostgreSQL schema
  utils/
    validators.js       Input validation helpers
frontend/
  src/
    App.jsx
    components/
      TaskList.jsx
      TaskCard.jsx
      AddTaskForm.jsx
    utils/
      api.js
```

## Getting started

```bash
npm install
npm run dev
```

API runs on `http://localhost:4000`.
Frontend runs on `http://localhost:5173`.
