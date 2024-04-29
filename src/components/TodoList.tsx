import type { Todo } from '../types'
import TodoUpdateForm from './TodoUpdateForm'
import TodoRow from './TodoRow'

type TodoListProps = {
  selectedTodoIdForUpdate?: Todo['id']
  todos: Todo[]
  onUpdate(updatedTodo: Todo): void
  onUpdateStart(id: Todo['id']): void
  onUpdateEnd(): void
}

export default function TodoList({
  selectedTodoIdForUpdate,
  todos,
  onUpdate,
  onUpdateEnd,
  onUpdateStart,
}: TodoListProps) {
  return (
    <>
      {todos.map(todo => (
        <TodoRow key={todo.id} todo={todo} onDoneUpdate={onUpdate}>
          <>
            {selectedTodoIdForUpdate === todo.id ? (
              <TodoUpdateForm todo={todo} onUpdate={onUpdate} onUpdateCancel={onUpdateEnd} />
            ) : (
              <div
                role="link"
                className={`cursor-pointer py-[7px] ${todo.done ? 'line-through text-slate-500' : ''}`}
                onClick={() => onUpdateStart(todo.id)}
              >
                {todo.title}
              </div>
            )}
          </>
        </TodoRow>
      ))}
    </>
  )
}
