import React, { useState } from 'react'
import Navbar from '../navbar'
import FileUploader from '../FileUploader'

const Upload = () => {

    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setFile] = useState(null)
    
    const handleFileSelect = (file) => {
        setFile(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        if (!form) return;
        const formData = new FormData(form)

        const companyName = formData.get('company-name')
        const jobTitle = formData.get('job-title')
        const description = formData.get('job-description')
     
        console.log({
            companyName, jobTitle, description, file
        });
        
    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
          <Navbar />

            <section className='main-section'>
                <div className='page-heading py-16'>
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className='w-full' />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvements tips</h2>
                    )}
                    {!isProcessing && (
                        <form id='uplaod-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className='form-div'>
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" placeholder='Company name...' id='company-name' name='company-name'/>
                            </div>
                            <div className='form-div'>
                                <label htmlFor="Job-Title">Job Title</label>
                                <input type="text" placeholder='Job Title...' id='job-title' name='job-title'/>
                            </div>
                            <div className='form-div'>
                                <label htmlFor="Job-Description">Job Description</label>
                                <textarea rows={5} placeholder='Job Description...' id='job-description' name='job-description'/>
                            </div>
                            <div className='form-div'>
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect}/>
                            </div>

                            <button className='primary-button' type='submit'>
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
    </main>
  )
}

export default Upload
