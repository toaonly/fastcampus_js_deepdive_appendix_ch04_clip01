import { vi } from 'vitest'
import db from './db/db.json'

vi.mock('./src/api.ts', () => {
  return {
    default: {
      getTodos() {
        return Promise.resolve(db.todos)
      },
      createTodo<T>(todo: T) {
        return Promise.resolve(todo)
      },
      updateTodo<T>(id, todo: T) {
        return Promise.resolve({ ...todo, id })
      },
    },
  }
})
