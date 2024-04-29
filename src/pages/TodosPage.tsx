import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
import { Icons } from '../components'
import type { Todo } from '../types'

export default function TodosPage() {
  const navigate = useNavigate()
  const params = useParams<{ uuid?: string }>()
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [newTodoTitle, setNewTodoTitle] = useState('')

  useEffect(() => {
    api.getTodos().then(setTodos)
  }, [])

  useEffect(() => {
    if (params.uuid) setTitle(todos.find(todo => todo.id === params.uuid)?.title ?? '')
  }, [params.uuid, todos])

  return (
    <div className="flex flex-col divide-y divide-slate-700">
      <div className="flex items-center py-4 px-4 gap-4">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex-1">
            <div className="mb-2">새로운 할 일 추가하기</div>
            <form
              className="flex gap-1 items-center"
              onSubmit={e => {
                e.preventDefault()

                api.createTodo({ title: newTodoTitle }).then(() => {
                  api.getTodos().then(setTodos)
                  setNewTodoTitle('')
                })
              }}
            >
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

      {todos.map(todo => (
        <div key={todo.id} className="flex items-center py-4 px-4 gap-4">
          <div
            className={`${todo.done ? 'checked' : ''}`}
            role="checkbox"
            onClick={() => {
              api.updateTodo(todo.id, { done: !todo.done }).then(({ done }) => {
                setTodos(todos => todos.map(_todo => (_todo.id === todo.id ? { ..._todo, done } : _todo)))
              })
            }}
          >
            {todo.done ? <Icons.Check className="fill-pink-500 w-full h-full" /> : ''}
          </div>
          <div className="flex flex-1 items-center gap-4">
            <div className="flex-1">
              {params.uuid === todo.id ? (
                <form
                  className="flex gap-1"
                  onSubmit={e => {
                    e.preventDefault()

                    api.updateTodo(todo.id, { title }).then(({ title }) => {
                      setTodos(todos => todos.map(_todo => (_todo.id === todo.id ? { ..._todo, title } : _todo)))
                      navigate('/', { replace: true })
                    })
                  }}
                >
                  <input
                    type="text"
                    className="flex-1"
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <button>수정</button>
                  <button className="outline" type="button" onClick={() => navigate('/', { replace: true })}>
                    취소
                  </button>
                </form>
              ) : (
                <div
                  role="link"
                  className={`cursor-pointer py-[7px] ${todo.done ? 'line-through text-slate-500' : ''}`}
                  onClick={() => navigate(`/${todo.id}`, { replace: true })}
                >
                  {todo.title}
                </div>
              )}
            </div>
            <div className="text-slate-500">
              <small>{dayjs(todo.createdAt).format('MMM. DD. YYYY hh:mm:ss')}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
