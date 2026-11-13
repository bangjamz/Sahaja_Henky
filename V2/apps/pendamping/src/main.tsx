import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/router'
import './gaya.css'

const akar = document.getElementById('root')
if (!akar) throw new Error('Elemen #root tidak ditemukan')

createRoot(akar).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
