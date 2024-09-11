import {AnswerCardProps} from './answer.interface'

export const dummyAnswerData: Omit<AnswerCardProps, 'onFlagClick'> = {
  questionName: 'What is your favorite color?',
  questionType: 'Multiple Choice',
  validation: 'Required',
  answerType: 'Text',
  options: [
    {value: 'red', label: 'Red'},
    {value: 'blue', label: 'Blue'},
    {value: 'green', label: 'Green'},
  ],
  response: 'Blue',
  remarks: 'Popular choice.',
  status: 'approved',
}
