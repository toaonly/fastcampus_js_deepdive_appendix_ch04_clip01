import { createBrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import TodosPage from './pages/TodosPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '',
        element: <TodosPage />,
      },
      {
        path: ':uuid',
        element: <TodosPage />,
      },
    ],
  },
])

export default router
