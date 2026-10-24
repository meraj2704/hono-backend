import { Hono } from 'hono'
import { taskStore } from '../data/tasks.js'


const tasksRoute = new Hono()

// GET /tasks
tasksRoute.get('/', (c) => {
  const done = c.req.query('done')
  const search = c.req.query('search')

  let result = taskStore.findAll()

  if (done !== undefined) {
    result = result.filter((t) => t.done === (done === 'true'))
  }
  if (search) {
    const s = search.toLowerCase()
    result = result.filter((t) => t.title.toLowerCase().includes(s))
  }

  return c.json(result)
})

tasksRoute.get('/stats', (c) => {
  const all = taskStore.findAll()
  const done = all.filter((t) => t.done).length
  return c.json({ total: all.length, done, pending: all.length - done })
})

// GET /tasks/:id
tasksRoute.get('/:id', (c) => {
  const task = taskStore.findById(Number(c.req.param('id')))
  if (!task) return c.json({ error: 'Task not found' }, 404)
  return c.json(task)
})

// POST /tasks
tasksRoute.post('/', async (c) => {
  const body = await c.req.json<{ title: string }>()
  return c.json(taskStore.create(body.title), 201)
})

// PATCH /tasks/:id
tasksRoute.patch('/:id', async (c) => {
  const body = await c.req.json<{ title?: string; done?: boolean }>()
  const task = taskStore.update(Number(c.req.param('id')), body)
  if (!task) return c.json({ error: 'Task not found' }, 404)
  return c.json(task)
})

// DELETE /tasks/:id
tasksRoute.delete('/:id', (c) => {
  const deleted = taskStore.remove(Number(c.req.param('id')))
  if (!deleted) return c.json({ error: 'Task not found' }, 404)
  return c.body(null, 204)
})

export default tasksRoute