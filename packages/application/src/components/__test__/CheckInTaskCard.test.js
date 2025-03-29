import { render } from '@testing-library/react'
import CheckInTaskCard from '../CheckInTaskCard';
  
const task = {
    id: '',
    title: '',
    type: ''
}
 
it('CheckInTaskCard renders correctly', () => {
  const { container } = render(<CheckInTaskCard task={task} index={1} />)
  expect(container).toMatchSnapshot()
})
