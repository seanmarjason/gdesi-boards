import { render } from '@testing-library/react'
import SignUp from '../sign-up';

test('SignUp renders correctly', () => {
  const { container } = render(<SignUp />)
  expect(container).toMatchSnapshot()
})
