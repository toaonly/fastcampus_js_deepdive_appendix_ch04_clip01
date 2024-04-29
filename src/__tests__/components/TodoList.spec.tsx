import { fireEvent, render, waitFor } from '@testing-library/react'
import db from '../../../db/db.json'
import TodoList from '../../components/TodoList'

describe('components/TodoList 테스트', () => {
  const todos = db.todos

  it('todo title 링크를 눌렀을 경우 onUpdateStart 가 호출이 되어야 한다', async () => {
    const onUpdate = vi.fn()
    const onUpdateEnd = vi.fn()
    const onUpdateStart = vi.fn()
    const result = render(
      <TodoList todos={todos} onUpdate={onUpdate} onUpdateEnd={onUpdateEnd} onUpdateStart={onUpdateStart} />
    )

    const titleList = await result.findAllByRole('link')

    fireEvent.click(titleList[0])

    await waitFor(() => {
      expect(onUpdateStart).toHaveBeenCalledTimes(1)
    })
  })

  it('selectedTodoIdForUpdate 가 있을 TodoUpdateForm 컴포넌트가 렌더링 되어야 한다', async () => {
    const onUpdate = vi.fn()
    const onUpdateEnd = vi.fn()
    const onUpdateStart = vi.fn()
    const result = render(
      <TodoList
        selectedTodoIdForUpdate={todos[0].id}
        todos={todos}
        onUpdate={onUpdate}
        onUpdateEnd={onUpdateEnd}
        onUpdateStart={onUpdateStart}
      />
    )

    const todoUpdateForm = await result.findByTestId('todo-update-form')

    expect(todoUpdateForm).toBeTruthy()
  })
})
