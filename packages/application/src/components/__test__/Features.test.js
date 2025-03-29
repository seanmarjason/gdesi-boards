import { render } from '@testing-library/react'
import Features from '../Features';

it('Features renders correctly', () => {
  const { container } = render(<Features />)
  expect(container).toMatchSnapshot()
})
