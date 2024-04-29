import { dateUtils } from '../utils'
import { Icons } from '.'
import api from '../api'
import type { PropsWithChildren } from 'react'
import type { Todo } from '../types'

type TodoRowProps = PropsWithChildren<{
  todo: Todo
  onDoneUpdate(todo: Todo): void
}>

export default function TodoRow({ todo, onDoneUpdate, children }: TodoRowProps) {
  const onTodoDoneClick = () => {
    api.updateTodo(todo.id, { done: !todo.done }).then(updatedTodo => {
      onDoneUpdate(updatedTodo)
    })
  }
  return (
    <div key={todo.id} className="flex items-center py-4 px-4 gap-4">
      <div className={`${todo.done ? 'checked' : ''}`} role="checkbox" onClick={() => onTodoDoneClick()}>
        {todo.done ? <Icons.Check className="fill-pink-500 w-full h-full" /> : ''}
      </div>
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1">{children}</div>
        <div className="text-slate-500">
          <small>{dateUtils.format(todo.createdAt, 'MMM. DD. YYYY hh:mm:ss')}</small>
        </div>
      </div>
    </div>
  )
}
