import { omit } from 'lodash-es'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
import { TodoCreationForm, TodoList } from '../components'
import type { Todo } from '../types'

export default function TodosPage() {
  const navigate = useNavigate()
  const { uuid } = useParams<{ uuid?: string }>()
  const [todos, setTodos] = useState<Todo[]>([])
  const refresh = () => api.getTodos().then(setTodos)
  const moveList = () => navigate('/', { replace: true })
  const moveDetail = (id: Todo['id']) => navigate(`/${id}`, { replace: true })

  const onCreated = (createdTodo: Todo) => {
    console.group(`추가 된 Todo: ${createdTodo.id}`)
    console.table(omit(createdTodo, ['id']))
    console.groupEnd()

    refresh()
  }

  const onUpdate = (updatedTodo: Todo) => {
    console.group(`업데이트 된 Todo: ${updatedTodo.id}`)
    console.table(omit(updatedTodo, ['id']))
    console.groupEnd()

    refresh()
  }
  const onUpdateEnd = () => {
    moveList()
  }
  const onUpdateStart = (id: Todo['id']) => {
    moveDetail(id)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="flex flex-col divide-y divide-slate-700">
      <TodoCreationForm onCreated={onCreated} />

      <TodoList
        selectedTodoIdForUpdate={uuid}
        todos={todos}
        onUpdate={onUpdate}
        onUpdateEnd={onUpdateEnd}
        onUpdateStart={onUpdateStart}
      />
    </div>
  )
}
