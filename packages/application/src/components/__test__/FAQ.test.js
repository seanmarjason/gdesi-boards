import { render } from '@testing-library/react'
import FAQ from '../FAQ';

it('FAQ renders correctly', () => {
  const { container } = render(<FAQ />)
  expect(container).toMatchSnapshot()
})
