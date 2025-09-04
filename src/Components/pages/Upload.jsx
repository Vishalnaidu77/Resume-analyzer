import React, { useState } from 'react'
import Navbar from '../Navbar'
import FileUploader from '../FileUploader'
import { usePuterStore } from '../../Lib/Puter'
import { useNavigate } from 'react-router-dom'
import { convertPdfToImage } from '../../Lib/pdf2img'
import { generateUUID } from '../../Lib/utils'
import { prepareInstructions } from '../../Constance'

const Upload = () => {
    const { auth, isLoading, fs, ai, kv} = usePuterStore()
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setFile] = useState(null)
    

    const handleFileSelect = (file) => {
        setFile(file)
    }

    const handleAnalyse = async ({companyName, jobTitle, jobDescription, file}) => {
        setIsProcessing(true)
        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file])

        if(!uploadedFile) return setStatusText("Error: Failed to upload file")

        setStatusText("Converting to image...")
        const imageFile = await convertPdfToImage(file)
        if (imageFile.error || !imageFile.file) {
            const errorMessage = imageFile.error || 'Failed to convert PDF to image';
            console.error('PDF Conversion Error:', errorMessage);
            setIsProcessing(false); // Stop processing indicator
            return setStatusText(`Error: ${errorMessage}`);
        }

        setStatusText('Uploading the image...')
        const uploadedImage = await fs.upload([imageFile.file])
        if(!uploadedImage) return setStatusText('Error: Failed to upload image.');

        setStatusText('Preparing data...')

        const uuid = generateUUID()
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resumefeedback:${uuid}`, JSON.stringify(data))

        setStatusText('Analyzing...')

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription})
        )

        if(!feedback) return setStatusText('Error: Failed to analyze resume.')

        setStatusText('Analyzing, redirecting...')
        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resumefeedback:${uuid}`, JSON.stringify(data))
        console.log(data);
        navigate(`/resumefeedback/${uuid}`)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        if (!form) return
        const formData = new FormData(form)

        const companyName = formData.get('company-name')
        const jobTitle = formData.get('job-title')
        const jobDescription = formData.get('job-description')

        if (!file) return

        handleAnalyse({ companyName, jobTitle, jobDescription, file })

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