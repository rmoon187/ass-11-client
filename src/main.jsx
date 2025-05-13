import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AuthProvider from './provider/AuthProvider'
import { ThemeProvider } from './provider/ThemeProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider><ThemeProvider><RouterProvider router={router}></RouterProvider></ThemeProvider></AuthProvider>
  </StrictMode>,
)
