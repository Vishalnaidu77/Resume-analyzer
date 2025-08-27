import React, { useEffect } from 'react'
import { usePuterStore } from '../../Lib/Puter'
import { useLocation, useNavigate } from 'react-router-dom'

const Auth = () => {
  const { isLoading, auth } = usePuterStore()
  const location = useLocation()
  const next = location.search.split("next=")[1]
  const navigate = useNavigate()


  useEffect(() => {
    if(auth.isAuthenticated) navigate(next)
  }, [auth.isAuthenticated, next])

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className='gradient-border shadow-lg'>
          <section className='flex flex-col gap-8 bg-white items-center rounded-2xl py-6 px-12'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <h1>Welcome</h1>
              <h2 className=''>Log In to Continue Your Job Journey</h2>
            </div>
            <div>
              {isLoading ? (
                <button className='auth-button animate-pulse w-fit'>
                  <p className='text-xl'>Signing you in...</p>
                </button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button className='auth-button w-fit' onClick={auth.signOut}>
                      <p className='text-xl'>Log Out</p>
                    </button>
                  ) : 
                    <button className='auth-button w-fit' onClick={auth.signIn}>
                      <p className='text-xl'>Log In</p>
                    </button>
                  }
              </>)}
            </div>
          </section>
        </div>
    </main>
  )
}

export default Auth
