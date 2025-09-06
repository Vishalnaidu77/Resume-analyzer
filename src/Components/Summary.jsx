import React from 'react'
import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'

const Category = ({ title, score }) => {
    const textColor = score > 70
        ? 'text-green-600' 
        : score > 49
        ? 'text-yellow-600' : 'text-red-600'

    return (
        <div className='resume-summary'>
            <div className='category'>
                <div className='flex flex-row gap-2 items-center justify-center'>
                    <p className='text-2xl'>{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className='text-2xl'>
                    <span className={textColor}>{score}</span>/100
                </p> 
            </div>
        </div>
    )
}

// Utility function to find a value by possible key names
const findValueByKeys = (obj, possibleKeys, defaultValue = 0) => {
    if (!obj || typeof obj !== 'object') return defaultValue;
    
    for (const key of possibleKeys) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
            return obj[key];
        }
    }
    return defaultValue;
}

// Utility function to extract rating from nested objects
const extractRatingFromObject = (obj, defaultValue = 0) => {
    if (!obj || typeof obj !== 'object') return defaultValue;
    
    // Look for 'rating' key first
    if (obj.hasOwnProperty('rating') && typeof obj.rating === 'number') {
        return obj.rating;
    }
    
    // Look for other possible rating keys
    const ratingKeys = ['rating', 'score', 'value', 'points'];
    for (const key of ratingKeys) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
            return obj[key];
        }
    }
    
    return defaultValue;
};

// Utility function to extract rating data dynamically
const extractRatingData = (feedback) => {
    if (!feedback) return { overallScore: 0, extractedData: {} };

    // Look for detailed_feedback and section_ratings in multiple possible locations
    const detailedFeedback = feedback.detailed_feedback || 
                            feedback.detailedFeedback || 
                            feedback.details || 
                            feedback;
    
    const sectionRatings = feedback.section_ratings || 
                          feedback.sectionRatings || 
                          feedback.ratings || 
                          feedback;

    // Define possible key variations for each metric
    const keyMappings = {
        ats_compatibility: [
            'ats_compatibility', 
            'atsCompatibility', 
            'ats_score', 
            'compatibility_score',
            'ats_rating',
            'ats'
        ],
        format_and_design: [
            'format_and_design', 
            'formatAndDesign', 
            'design_score', 
            'format_score',
            'formatting',
            'format_and_structure',
            'format'
        ],
        content_quality: [
            'content_quality', 
            'contentQuality', 
            'content_score', 
            'quality_score',
            'content'
        ],
        relevance_to_job: [
            'relevance_to_job', 
            'relevanceToJob', 
            'relevance', 
            'job_relevance',
            'relevance_score'
        ],
        overall_rating: [
            'overall_rating', 
            'overallRating', 
            'overall_score', 
            'total_score',
            'final_score',
            'overallScore'
        ],
        impact_and_achievements: [
            'impact_and_achievements',
            'impactAndAchievements',
            'impact',
            'achievements',
            'accomplishments'
        ]
    };

    // Extract scores using the key mappings
    const extractedData = {};
    
    Object.entries(keyMappings).forEach(([standardKey, possibleKeys]) => {
        let foundValue = 0;
        
        // First check in detailed_feedback
        for (const key of possibleKeys) {
            if (detailedFeedback && detailedFeedback[key]) {
                const value = extractRatingFromObject(detailedFeedback[key]);
                if (value > 0) {
                    foundValue = value;
                    break;
                }
            }
        }
        
        // If not found in detailed_feedback, check section_ratings
        if (foundValue === 0) {
            foundValue = findValueByKeys(sectionRatings, possibleKeys);
        }
        
        // If still not found, check root feedback object
        if (foundValue === 0) {
            foundValue = findValueByKeys(feedback, possibleKeys);
        }
        
        extractedData[standardKey] = foundValue;
    });

    // Determine overall score priority
    const overallScore = extractedData.overall_rating || 
                        extractedData.ats_compatibility || 
                        0;

    return {
        overallScore,
        extractedData
    };
}

// Alternative approach: Dynamic key detection with nested object support
const detectAndExtractScores = (feedback) => {
    if (!feedback) return { overallScore: 0, extractedData: {} };

    const detailedFeedback = feedback.detailed_feedback || feedback;
    const sectionRatings = feedback.section_ratings || feedback;
    const scores = {};
    
    // Common patterns to look for
    const patterns = {
        ats: /ats|compatibility/i,
        format: /format|design|structure/i,
        content: /content|quality/i,
        relevance: /relevance|job/i,
        overall: /overall|total|final/i,
        impact: /impact|achievement/i
    };

    // Function to scan object and extract numeric values
    const scanForRatings = (obj, prefix = '') => {
        if (!obj || typeof obj !== 'object') return;
        
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            
            // If it's an object with a rating property
            if (typeof value === 'object' && value !== null && value.rating !== undefined) {
                const rating = typeof value.rating === 'number' ? value.rating : 0;
                
                if (rating >= 0 && rating <= 10) {
                    const fullKey = prefix ? `${prefix}_${key}` : key;
                    
                    if (patterns.ats.test(key)) {
                        scores.ats_compatibility = rating;
                    } else if (patterns.format.test(key)) {
                        scores.format_and_design = rating;
                    } else if (patterns.content.test(key)) {
                        scores.content_quality = rating;
                    } else if (patterns.relevance.test(key)) {
                        scores.relevance_to_job = rating;
                    } else if (patterns.overall.test(key)) {
                        scores.overall_rating = rating;
                    } else if (patterns.impact.test(key)) {
                        scores.impact_and_achievements = rating;
                    }
                }
            }
            // If it's a direct numeric value
            else if (typeof value === 'number' && value >= 0 && value <= 10) {
                if (patterns.ats.test(key)) {
                    scores.ats_compatibility = value;
                } else if (patterns.format.test(key)) {
                    scores.format_and_design = value;
                } else if (patterns.content.test(key)) {
                    scores.content_quality = value;
                } else if (patterns.relevance.test(key)) {
                    scores.relevance_to_job = value;
                } else if (patterns.overall.test(key)) {
                    scores.overall_rating = value;
                } else if (patterns.impact.test(key)) {
                    scores.impact_and_achievements = value;
                }
            }
        });
    };

    // Scan both detailed_feedback and section_ratings
    scanForRatings(detailedFeedback, 'detailed');
    scanForRatings(sectionRatings, 'section');
    
    // Also scan root level
    scanForRatings(feedback, 'root');

    const overallScore = scores.ats_compatibility || 
                        scores.overall_rating || 
                        Object.values(scores)[0] || 
                        0;

    return { overallScore, extractedData: scores };
}

const Summary = ({ feedback }) => {
    // Use the extraction utility
    const { overallScore, extractedData } = extractRatingData(feedback);
    
    // Fallback to detection method if extraction fails
    const fallbackData = detectAndExtractScores(feedback);
    
    // Get ATS score specifically for the gauge
    const atsScore = extractedData?.ats_compatibility || 
                    fallbackData.extractedData?.ats_compatibility || 
                    (feedback?.ATS?.score ? feedback.ATS.score : 0);
    
    const finalOverallScore = overallScore || fallbackData.overallScore;
    const finalScores = {
        ats_compatibility: atsScore,
        format_and_design: extractedData?.format_and_design || fallbackData.extractedData?.format_and_design || 0,
        content_quality: extractedData?.content_quality || fallbackData.extractedData?.content_quality || 0,
        relevance_to_job: extractedData?.relevance_to_job || fallbackData.extractedData?.relevance_to_job || 0,
        overall_rating: extractedData?.overall_rating || fallbackData.extractedData?.overall_rating || finalOverallScore,
        impact_and_achievements: extractedData?.impact_and_achievements || fallbackData.extractedData?.impact_and_achievements || 0
    };

    return (
        <div className='bg-white rounded-2xl shadow-md w-full'>
            <div className='flex flex-row items-center p-4 gap-8'>
                <ScoreGauge score={finalScores.ats_compatibility}/>

                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl font-bold'>ATS Compatibility Score</h2>
                    <p className='text-sm text-gray-500'>This score is calculated based on the variables listed below.</p>
                </div>
            </div>

            <div className='p-4 pt-0'>
                <Category 
                    title="Format & Design" 
                    score={finalScores.format_and_design} 
                />
                <Category 
                    title="Content Quality" 
                    score={finalScores.content_quality} 
                />
                <Category 
                    title="Impact & Achievements" 
                    score={finalScores.impact_and_achievements} 
                />
                <Category 
                    title="Overall Rating" 
                    score={finalScores.overall_rating} 
                />
            </div>
        </div>
    )
}

export default Summary