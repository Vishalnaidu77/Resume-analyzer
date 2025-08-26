import { useState } from 'react'
import './App.css'
import Navbar from './Components/navbar'
import { Resume } from './Constance'
import ResumeCard from './Components/ResumeCard'
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import AppLayout from './Components/UI/AppLayout'
import Auth from './Components/pages/Auth'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/auth',
          element: <Auth />
        }
      ]
    }
  ])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <RouterProvider router={router} />
    </main>
  )
}



export default App
