import React, {useEffect, useMemo, useState} from 'react'
import SectionCard from './components/SectionCard'
import SectionSkeleton from './components/SectionSkeleton'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'
import {Section, SectionFilters} from './sectionInterfaces'
import {fetchSections} from './api'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {FaArrowLeft} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

const SectionList: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [{type: 'text', label: 'Section Name', name: 'name', placeholder: 'Section Name'}],
    []
  )
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<SectionFilters>({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetchSections({limit: itemsPerPage, page: currentPage})

        const response = {
          results: [
            {
              id: '1',
              sectionName: 'Introduction to Programming',
              sectionLanguage: 'English',
              description:
                'This section covers the basics of programming, including syntax and simple algorithms.',
            },
            {
              id: '2',
              sectionName: 'Data Structures',
              sectionLanguage: 'English',
              description:
                'Learn about various data structures such as arrays, linked lists, stacks, and queues.',
            },
            {
              id: '3',
              sectionName: 'Web Development',
              sectionLanguage: 'Spanish',
              description:
                'An overview of web development technologies including HTML, CSS, and JavaScript.',
            },
            {
              id: '4',
              sectionName: 'Database Management',
              sectionLanguage: 'French',
              description: 'This section introduces database concepts and SQL for managing data.',
            },
            {
              id: '5',
              sectionName: 'Machine Learning',
              sectionLanguage: 'English',
              description: 'Explore the fundamentals of machine learning and its applications.',
            },
            {
              id: '6',
              sectionName: 'Cybersecurity Basics',
              sectionLanguage: 'German',
              description:
                'Learn about the principles of cybersecurity and how to protect information systems.',
            },
            {
              id: '7',
              sectionName: 'Cloud Computing',
              sectionLanguage: 'English',
              description: 'An introduction to cloud computing services and deployment models.',
            },
            {
              id: '8',
              sectionName: 'Mobile App Development',
              sectionLanguage: 'Chinese',
              description:
                'This section covers the basics of developing mobile applications for Android and iOS.',
            },
            {
              id: '9',
              sectionName: 'Artificial Intelligence',
              sectionLanguage: 'English',
              description: 'Explore the concepts and techniques used in artificial intelligence.',
            },
            {
              id: '10',
              sectionName: 'Networking Fundamentals',
              sectionLanguage: 'Italian',
              description:
                'Learn about the basics of computer networking and communication protocols.',
            },
          ],
          page: 1,
          limit: 10,
          totalPages: 1,
          totalResults: 10,
        }

        setSections(response.results)
        setTotalPages(response.totalPages)
        setTotalResults(response.totalResults)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage, itemsPerPage])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = () => {
    // Implement filter logic
    console.log('Filter applied')
  }

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <div className='flex justify-between items-center flex-wrap mb-4'>
          <div className='flex flex-row items-center'>
            <button
              onClick={() => navigate('/program')} // Navigate to home page
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            >
              <FaArrowLeft size={22} />
            </button>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Sections</h2>
          </div>
          <div className='flex items-center'>
            <Button
              label='Create new'
              Icon={AiOutlinePlus}
              onClick={() => setIsCreateModalOpen(true)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            ></Button>
            <Button
              label='Filter'
              Icon={AiOutlineFilter}
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
            ></Button>
          </div>
        </div>
        {isFilterVisible && (
          <div className='relative'>
            <Filter
              onApplyFilter={handleApplyFilter}
              setIsFilterVisible={setIsFilterVisible}
              preFilters={filters}
              fields={filterFields}
            />
          </div>
        )}
        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
            {Array.from({length: 4}).map((_, index) => (
              <SectionSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
            {sections.map((section) => (
              <SectionCard key={section.id} {...section} />
            ))}
          </div>
        )}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Section'
            onLimitChange={onLimitChange}
            disabled={loading}
          />
        )}

        {loading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Section'
            onLimitChange={onLimitChange}
            disabled={loading}
          />
        )}
      </div>
    </div>
  )
}

export default SectionList
