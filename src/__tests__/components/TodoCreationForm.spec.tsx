import { fireEvent, render, waitFor } from '@testing-library/react'
import TodoCreationForm from '../../components/TodoCreationForm'

describe('components/TodoCreationForm 테스트', () => {
  it('추가버튼을 눌렀을 때 onCreated 가 호출이 되어야 한다', async () => {
    const onCreated = vi.fn()
    const result = render(<TodoCreationForm onCreated={onCreated} />)

    const inputNewTodoTitle = await result.findByTestId('input-new-todo-title')
    const submitButton = await result.findByText('추가')

    fireEvent.change(inputNewTodoTitle, { target: { value: '새로운 할 일' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(onCreated).toHaveBeenCalledTimes(1)
    })
  })
})
