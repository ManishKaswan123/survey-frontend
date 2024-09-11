import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {AiFillFlag, AiOutlineFlag} from 'react-icons/ai' // Using react-icons
import {AnswerCardProps} from '../answer.interface'

const AnswerCard: React.FC<AnswerCardProps> = ({
  questionName,
  questionType,
  validation,
  answerType,
  options,
  response,
  remarks,
  status,
  onFlagClick,
}) => {
  // Local state to manage whether the flag is filled or not
  const [isFlagged, setIsFlagged] = useState(status === 'flagged')

  const renderOptions = () => {
    if (!options || options.length === 0) return null
    return (
      <div className='mt-1'>
        <h3 className='text-gray-800 font-medium text-sm mb-1'>Options:</h3>
        <div className='flex flex-wrap gap-1'>
          {options.map((option, index) => (
            <div key={index} className='text-gray-700 bg-gray-100 p-1 rounded-md flex-shrink-0'>
              {option.label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const statusClass = () => {
    switch (status) {
      case 'approved':
        return 'text-green-600'
      case 'flagged':
        return 'text-red-600'
      case 'submitted':
        return 'text-yellow-600'
      case 'resubmitted':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  // Handle flag toggle when clicked
  const handleFlagClick = () => {
    setIsFlagged(!isFlagged) // Toggle flag state
    onFlagClick() // Call the passed-in function (parent handler)
  }

  return (
    <div className='bg-white shadow-sm rounded-md overflow-hidden border border-gray-300 hover:shadow-md transition-all duration-300 max-w-full mx-auto my-2'>
      <div className='p-3'>
        {/* Question Header */}
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-lg font-semibold text-gray-800'>{questionName}</h2>
          <span className='bg-blue-100 text-blue-500 text-xs font-semibold px-2 py-1 rounded-full'>
            {questionType}
          </span>
        </div>

        {/* Question and Answer Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-2'>
          <div>
            <p className='text-gray-600 text-xs'>
              <strong>Validation:</strong> {validation}
            </p>
          </div>
          <div>
            <p className='text-gray-600 text-xs'>
              <strong>Answer Type:</strong> {answerType}
            </p>
          </div>
          <div>
            <p className='text-gray-600 text-xs'>
              <strong>Response:</strong> {response}
            </p>
          </div>
          <div>
            <p className={`text-xs font-semibold ${statusClass()}`}>
              <strong>Status:</strong> {status}
            </p>
          </div>
        </div>

        {/* Render Options (If applicable) */}
        {renderOptions()}

        {/* Remarks */}
        <div className='mt-2'>
          <p className='text-gray-600 text-sm'>
            <strong>Remarks:</strong> {remarks || 'No remarks provided.'}
          </p>
        </div>

        {/* Stylish Link and Flag Icon */}
        <div className='mt-3 flex justify-between items-center'>
          <Link to='/question'>
            <span className='text-gray-800 font-medium text-sm hover:text-blue-600 hover:underline transition-colors duration-200'>
              View Question
            </span>
          </Link>
          <button onClick={handleFlagClick} className='text-red-600 hover:text-red-800'>
            {isFlagged ? <AiFillFlag className='h-5 w-5' /> : <AiOutlineFlag className='h-5 w-5' />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnswerCard
