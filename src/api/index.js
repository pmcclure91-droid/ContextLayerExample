import express from 'express';
import tasksRouter from './routes/tasks.js';
import usersRouter from './routes/users.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Public routes
app.use('/api/users', usersRouter);

// Protected routes
app.use('/api/tasks', authMiddleware, tasksRouter);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`TaskFlow API running on port ${PORT}`));
