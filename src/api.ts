import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import type { Todo } from './types'

const api = {
  getTodos() {
    return fetch(`http://localhost:3000/todos`).then(res => res.json() as Promise<Todo[]>)
  },

  createTodo(newTodo: Omit<Todo, 'id' | 'createdAt' | 'done'>) {
    return fetch(`http://localhost:3000/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newTodo,
        id: uuid(),
        createdAt: dayjs().format(),
        done: false,
      }),
    }).then(res => res.json() as Promise<Todo>)
  },

  updateTodo(id: Todo['id'], updatedTodo: Partial<Omit<Todo, 'id' | 'createdAt'>>) {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updatedTodo,
      }),
    }).then(res => res.json() as Promise<Todo>)
  },
}

export default api
