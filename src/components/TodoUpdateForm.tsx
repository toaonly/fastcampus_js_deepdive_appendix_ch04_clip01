import { useState, type MouseEvent, type FormEventHandler } from 'react'
import api from '../api'
import type { Todo } from '../types'

type TodoFormProps = {
  todo: Todo
  onUpdate(updatedTdo: Todo): void
  onUpdateCancel(e?: MouseEvent<HTMLButtonElement>): void
}

export default function TodoUpdateForm({ todo, onUpdate, onUpdateCancel }: TodoFormProps) {
  const [newTitle, setNewTitle] = useState(todo.title)

  const onUpdateFormSubmit: FormEventHandler = e => {
    e.preventDefault()

    api.updateTodo(todo.id, { title: newTitle }).then(updatedTodo => {
      onUpdate(updatedTodo)
      onUpdateCancel()
    })
  }

  return (
    <form className="flex gap-1" onSubmit={onUpdateFormSubmit} data-testid="todo-update-form">
      <input
        type="text"
        className="flex-1"
        autoFocus
        value={newTitle}
        required
        onChange={e => setNewTitle(e.target.value)}
        data-testid="input-update-todo-title"
      />
      <button>수정</button>
      <button className="outline" type="button" onClick={onUpdateCancel}>
        취소
      </button>
    </form>
  )
}
