import { render } from '@testing-library/react'
import CheckInRecord from '../CheckInRecord';

const checkIn = {
    date: '',
    rating: '',
    tasksCompleted: [],
    tasksStarted: [],
    tasksDueNext: [],
    comments: ''
}
 
it('CheckInRecord renders correctly', () => {
  const { container } = render(<CheckInRecord checkIn={checkIn} />)
  expect(container).toMatchSnapshot()
})
