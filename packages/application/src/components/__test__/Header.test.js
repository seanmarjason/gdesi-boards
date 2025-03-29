import { render } from '@testing-library/react'
import Header from '../Header';

test('Header renders correctly', () => {
  const { container } = render(<Header navigation={['Root', 'Child']} />)
  expect(container).toMatchSnapshot()
})
