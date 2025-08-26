import React from 'react'
import { Resume } from '../../Constance'
import ResumeCard from '../ResumeCard'

const Home = () => {
  return (
    <>
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
    </>

  )
}

export default Home
