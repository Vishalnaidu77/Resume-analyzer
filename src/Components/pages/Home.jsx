import React, { useEffect, useState } from 'react'
import { Resume } from '../../Constance'
import ResumeCard from '../ResumeCard'
import Navbar from '../Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { usePuterStore } from '../../Lib/Puter'

const Home = () => {

  const { auth, kv, fs } = usePuterStore()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [loadingResumes, setLoadingResumes] = useState(false)
  const [isWiping, setIsWiping] = useState(false)

  useEffect(() => {
    if(!auth.isAuthenticated) navigate("/auth?next=/")
  }, [auth.isAuthenticated])

  const loadResumes = async () => {
    setLoadingResumes(true)

    const resumes = (await kv.list('resumefeedback:*', true));

    const parsedResume = resumes?.map((resume) => (
      JSON.parse(resume.value)
    ))

  
    setResumes(parsedResume || [])
    setLoadingResumes(false)
  }

  useEffect(() => {
    loadResumes();
  }, [])

  const handleWipeAll = async () => {
    if (!window.confirm('Are you sure you want to delete all resumes? This action cannot be undone.')) {
      return;
    }

    setIsWiping(true);

    try {
      console.log('Starting wipe operation...');
      
      // Method 1: Try using flush to clear all KV data
      try {
        await kv.flush();
        console.log('KV store flushed successfully');
      } catch (flushError) {
        console.warn('Flush failed, trying individual deletion:', flushError);
        
        // Method 2: Individual deletion if flush fails
        const keys = await kv.list('resumefeedback:*');
        console.log('Found keys to delete:', keys);
        
        if (keys && keys.length > 0) {
          for (const keyItem of keys) {
            const keyName = keyItem.key || keyItem;
            try {
              await kv.del(keyName);
              console.log('Deleted key:', keyName);
            } catch (delError) {
              console.warn('Failed to delete key:', keyName, delError);
            }
          }
        }
      }

      // Clear local state immediately
      setResumes([]);
      
      // Reload resumes to verify deletion
      setTimeout(async () => {
        await loadResumes();
      }, 1000);
      
      console.log('Wipe operation completed');
      
    } catch (error) {
      console.error('Complete wipe operation failed:', error);
      alert('Failed to delete resumes. Please check console for details.');
    } finally {
      setIsWiping(false);
    }
  }

  return (
    <>
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
          <Navbar />

            <section className='main-section'>
              <div className="page-heading">
                  <h1>Track Your Applications & Resume Ratings</h1>
                  {!loadingResumes && resumes?.length === 0 ? (
                    <h2>No Resume found. Upload your first resume to get feedback</h2>
                  ) : (
                  <h2>Review your submissions and AI-powered feedback</h2>
                    
                  )}
              </div>
              
              {/* Wipe Button - Show only when there are resumes and not loading */}
              {!loadingResumes && resumes.length > 0 && (
                <div className='flex justify-center mt-4'>
                  <button 
                    onClick={handleWipeAll}
                    disabled={isWiping}
                    className='bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200'
                  >
                    {isWiping ? 'Deleting...' : 'Delete All Resumes'}
                  </button>
                </div>
              )}

              {loadingResumes && (
                <div className='flex flex-col items-center justify-center'>
                  <img src="/images/resume-scan-2.gif" className='w-[200px] smooth-gif' />
                </div>
              )}

              {isWiping && (
                <div className='flex flex-col items-center justify-center mt-8'>
                  <img src="/images/resume-scan-2.gif" className='w-[200px]' />
                  <p className='text-gray-600 mt-4'>Deleting all resumes...</p>
                </div>
              )}
            </section>

            {!loadingResumes && !isWiping && resumes.length > 0 && (
                <div className='resumes-section py-16'>
                    {resumes.map((resume) => {
                        return <ResumeCard key={resume.id} resume={resume}/>
                    })}
                </div>
            )}

            {!loadingResumes && resumes?.length === 0 && !isWiping && (
              <div className='flex flex-col justify-center items-center mt-10 gap-4'>
                <Link to='/upload' className='primary-button w-fit text-lg font-semibold'>
                  Upload Resume
                </Link>
              </div>
            )}
        </main>
    </>
  )
}

export default Home