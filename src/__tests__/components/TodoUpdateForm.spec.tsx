import { fireEvent, render, waitFor } from '@testing-library/react'
import db from '../../../db/db.json'
import TodoUpdateForm from '../../components/TodoUpdateForm'

describe('components/TodoUpdateForm 테스트', () => {
  const todos = db.todos

  it('체크박스를 눌렀을 때 onUpdate 가 호출이 되어야 한다', async () => {
    const onUpdate = vi.fn()
    const onUpdateCancel = vi.fn()
    const result = render(<TodoUpdateForm todo={todos[0]} onUpdate={onUpdate} onUpdateCancel={onUpdateCancel} />)

    const inputNewTodoTitle = await result.findByTestId('input-update-todo-title')
    const submitButton = await result.findByText('수정')

    fireEvent.change(inputNewTodoTitle, { target: { value: '수정된 할 일' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledTimes(1)
    })
  })
})
