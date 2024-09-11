export interface AnswerCardProps {
  questionName: string
  questionType: string
  validation: string
  answerType: string
  options: {value: string; label: string}[]
  response: string
  remarks: string
  status: 'submitted' | 'approved' | 'flagged' | 'resubmitted'
  onFlagClick: () => void // Action handler for flagging
}
