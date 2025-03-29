import { render } from '@testing-library/react'
import Features from '../Features';

test('Features renders correctly', () => {
  const { container } = render(<Features />)
  expect(container).toMatchSnapshot()
})
