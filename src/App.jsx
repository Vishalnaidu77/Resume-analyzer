import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/navbar'
import { Resume } from './Constance'
import ResumeCard from './Components/ResumeCard'
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import AppLayout from './Components/UI/AppLayout'
import Auth from './Components/pages/Auth'
import { usePuterStore } from './Lib/Puter'
import Upload from './Components/pages/Upload'

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
        },
        {
          path: '/upload',
          element: <Upload />
        }
      ]
    }
  ])

  const { init } = usePuterStore()
  
  useEffect(() => {
    init()
  }, [init])
  

  return (
    <>
      {/* {window.puter.ai.chat()} */}
      <RouterProvider router={router} />
    </>

  )
}



export default App
