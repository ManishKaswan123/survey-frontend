import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import AnswerCard from './answer.component/card'
import {dummyAnswerData} from './answer.dummy'

const Custom: React.FC = () => {
  return (
    <div className='p-6'>
      <AnswerCard {...dummyAnswerData} onFlagClick={() => {}} />
    </div>
  )
}

const AnswerPage: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/answer'}></DashboardWrapper>
    </>
  )
}

export default AnswerPage
