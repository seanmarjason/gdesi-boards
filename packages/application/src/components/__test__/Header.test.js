import { render } from '@testing-library/react'
import Header from '../Header';

it('Header renders correctly', () => {
  const { container } = render(<Header navigation={['Root', 'Child']} />)
  expect(container).toMatchSnapshot()
})
