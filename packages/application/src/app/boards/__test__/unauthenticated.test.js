import { render } from '@testing-library/react'
import Unauthenticated from '../unauthenticated';
 
test('Unauthenticated renders correctly', () => {
  const { container } = render(<Unauthenticated />)
  expect(container).toMatchSnapshot()
})
