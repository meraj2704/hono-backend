import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import tasksRoute from './routes/tasks.js'

const app = new Hono().basePath('/api')

app.get('/', (c) => c.text('Tasks API is running'))
app.route('/tasks', tasksRoute)

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})