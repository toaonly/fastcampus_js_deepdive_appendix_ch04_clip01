import { FormEventHandler, useState } from 'react'
import api from '../api'
import type { Todo } from '../types'

type TodoCreationFormProps = {
  onCreated(createdTodo: Todo): void
}

export default function TodoCreationForm({ onCreated }: TodoCreationFormProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const onCreationFormSubmit: FormEventHandler = e => {
    e.preventDefault()

    api.createTodo({ title: newTodoTitle }).then(createdTodo => {
      setNewTodoTitle('')
      onCreated(createdTodo)
    })
  }

  return (
    <div className="flex items-center py-4 px-4 gap-4">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1">
          <div className="mb-2">새로운 할 일 추가하기</div>
          <form className="flex gap-1 items-center" onSubmit={onCreationFormSubmit}>
            <input
              type="text"
              className="flex-1"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
            />
            <button>추가</button>
          </form>
        </div>
      </div>
    </div>
  )
}
