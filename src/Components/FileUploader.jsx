import React, { useState } from 'react'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../Lib/utils'

const maxFileSize = 20 * 1024 * 1024;

const FileUploader = ({ onFileSelect }) => {
  const [file, setFile] = useState()
    
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0] || null
    onFileSelect?.(file)
  }, [onFileSelect])

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
    onDrop,
    multiple: false,
    accept: { '/application/pdf' : ['.pdf']},
    maxSize: maxFileSize
})

  return (
    <div className='w-full gradient-border'>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='space-y-4 cursor-pointer'>
                <div className='flex items-center justify-center mx-auto w-16 h-16'>
                    <img src="/icons/info.svg" sizes='20'/>
                </div>

                {file ? (
                    <div>

                    </div>
                ) : (
                    <div>
                        <p className='text-lg to-gray-500 '>
                            <span className='font-semibold'>
                                Click to upload
                            </span> or  drag and drop
                        </p>
                        <p className='text-lg text-gray-500'>PDF (max {formatSize(maxFileSize)})</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default FileUploader
