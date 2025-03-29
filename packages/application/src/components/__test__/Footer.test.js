import { render } from '@testing-library/react'
import Footer from '../Footer';

test('Footer renders correctly', () => {
  const { container } = render(<Footer />)
  expect(container).toMatchSnapshot()
})
