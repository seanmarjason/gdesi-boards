import { render } from '@testing-library/react'
import Unauthorised from '../unauthorised';
 
test('Unauthorised renders correctly', () => {
  const { container } = render(<Unauthorised />)
  expect(container).toMatchSnapshot()
})
