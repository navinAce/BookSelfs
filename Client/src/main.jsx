import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { List } from './component/ListingPage.jsx'
import { AddBooks } from './component/AddBooks.jsx'
import { UpdateBooks } from './component/UpdateBooks.jsx'
import { DeleteBooks } from './component/DeleteBooks.jsx'

const router=createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <List/>
      },
      {
        path: 'add',
        element: <AddBooks/>,
      },
      {
        path: 'update',
        element: <UpdateBooks/>,
      },
      {
        path: 'delete',
        element: <DeleteBooks/>,
      }
    ],
      
  }
]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
