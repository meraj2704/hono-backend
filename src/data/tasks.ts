export type Task = { id: number; title: string; done: boolean }

const tasks: Task[] = [
  { id: 1, title: 'Learn Hono', done: false },
  { id: 2, title: 'Build API', done: false },
]
let nextId = 3

export const taskStore = {
  findAll: () => tasks,

  findById: (id: number) => tasks.find((t) => t.id === id),

  create: (title: string) => {
    const task: Task = { id: nextId++, title, done: false }
    tasks.push(task)
    return task
  },

  update: (id: number, data: { title?: string; done?: boolean }) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return undefined
    if (data.title !== undefined) task.title = data.title
    if (data.done !== undefined) task.done = data.done
    return task
  },

  remove: (id: number) => {
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) return false
    tasks.splice(index, 1)
    return true
  },
}