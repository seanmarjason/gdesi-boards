import { render } from '@testing-library/react'
import Unauthenticated from '../unauthenticated';
 
it('Unauthenticated renders correctly', () => {
  const { container } = render(<Unauthenticated />)
  expect(container).toMatchSnapshot()
})
