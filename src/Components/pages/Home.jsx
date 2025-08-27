import React, { useEffect } from 'react'
import { Resume } from '../../Constance'
import ResumeCard from '../ResumeCard'
import Navbar from '../navbar'
import { useNavigate } from 'react-router-dom'
import { usePuterStore } from '../../Lib/Puter'

const Home = () => {

  const { auth } = usePuterStore()
  const navigate = useNavigate()


  useEffect(() => {
    if(!auth.isAuthenticated) navigate("/auth?next=/")
  }, [auth.isAuthenticated])


  return (
    <>
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
          <Navbar />


            <section className='main-section'>
            <div className="page-heading">
                <h1>Track Your Applications & Resume Ratings</h1>
                <h2>Review your submissions and AI-powered feedback</h2>
            </div>
            </section>

            {Resume.length > 0 && (
                <div className='resumes-section py-16'>
                    {Resume.map((resume) => {
                        return <ResumeCard key={resume.id} resume={resume}/>
                    })}
                </div>
            )}
        </main>

    </>

  )
}

export default Home
