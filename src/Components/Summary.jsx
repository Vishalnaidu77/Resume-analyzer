import React from 'react'
import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'

const Category = ({ title, score }) => {

    const textColor =  score > 7 
    ? 'text-green-600' 
    : score > 4.9
    ? 'text-yellow-600' : 'text-red-600'

    return (
        <div className='resume-summary'>
            <div className='category'>
                <div className='flex flex-row gap-2 items-center justify-center'>
                    <p className='text-2xl'>{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className='text-2xl'>
                    <span className={textColor}>{score}</span>/10
                </p> 
            </div>
        </div>
    )
}

const Summary = ({ feedback }) => {
  console.log('Feedback received:', feedback);
  
  // Extract overall score from your data structure
  // Access ats_compatibility directly from feedback object
  const overallScore = feedback?.section_ratings.ats_compatibility || 0;
  
  const sectionRatings = feedback?.section_ratings || {};
  
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
        <div className='flex flex-row items-center p-4 gap-8'>
            <ScoreGauge score={overallScore}/>

            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>ATS Compatibility Score</h2>
                <p className='text-sm text-gray-500'>This score is calculated based on the variables listed below.</p>
            </div>
        </div>

        {/* Display section ratings */}
        <div className='p-4 pt-0'>
            <Category 
                title="Format & Design" 
                score={sectionRatings.format_and_design} 
            />
            <Category 
                title="Content Quality" 
                score={sectionRatings.content_quality} 
            />
            <Category 
                title="Relevance" 
                score={sectionRatings.relevance_to_job} 
            />
            <Category 
                title="Overall Rating" 
                score={sectionRatings.overall_rating || feedback?.overall_rating || 0} 
            />
            
        </div>
    </div>
  )
}

export default Summary