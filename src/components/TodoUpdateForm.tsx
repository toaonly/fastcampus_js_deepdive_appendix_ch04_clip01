import { useState, type MouseEvent, type FormEventHandler } from 'react'
import api from '../api'
import type { Todo } from '../types'

type TodoFormProps = {
  todo: Todo
  onUpdate(updatedTdo: Todo): void
  onUpdateCancle(e?: MouseEvent<HTMLButtonElement>): void
}

export default function TodoForm({ todo, onUpdate, onUpdateCancle }: TodoFormProps) {
  const [newTitle, setNewTitle] = useState(todo.title)

  const onUpdateFormSubmit: FormEventHandler = e => {
    e.preventDefault()

    api.updateTodo(todo.id, { title: newTitle }).then(updatedTodo => {
      onUpdate(updatedTodo)
      onUpdateCancle()
    })
  }

  return (
    <form className="flex gap-1" onSubmit={onUpdateFormSubmit}>
      <input type="text" className="flex-1" autoFocus value={newTitle} onChange={e => setNewTitle(e.target.value)} />
      <button>수정</button>
      <button className="outline" type="button" onClick={onUpdateCancle}>
        취소
      </button>
    </form>
  )
}
