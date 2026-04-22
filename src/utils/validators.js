import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  due_date: z.string().datetime({ offset: true }).optional().nullable(),
});

export function validateTask(body) {
  const result = taskSchema.safeParse(body);
  if (!result.success) {
    return { success: false, error: result.error.issues.map(i => i.message).join(', ') };
  }
  return { success: true, data: result.data };
}
