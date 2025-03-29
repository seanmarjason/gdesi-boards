import { render } from '@testing-library/react'
import Hero from '../Hero';

test('Hero renders correctly', () => {
  const { container } = render(<Hero />)
  expect(container).toMatchSnapshot()
})
