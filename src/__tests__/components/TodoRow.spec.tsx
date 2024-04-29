import { fireEvent, render, waitFor } from '@testing-library/react'
import db from '../../../db/db.json'
import TodoRow from '../../components/TodoRow'

describe('components/TodoRow 테스트', () => {
  const todos = db.todos

  it('체크박스를 눌렀을 때 onDoneUpdate 가 호출이 되어야 한다', async () => {
    const onDoneUpdate = vi.fn()
    const result = render(<TodoRow todo={todos[0]} onDoneUpdate={onDoneUpdate} />)

    const checkbox = await result.findByRole('checkbox')

    fireEvent.click(checkbox)

    await waitFor(() => {
      expect(onDoneUpdate).toHaveBeenCalledTimes(1)
    })
  })
})
