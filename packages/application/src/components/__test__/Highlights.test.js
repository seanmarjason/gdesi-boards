import { render } from '@testing-library/react'
import Highlights from '../Highlights';

it('Highlights renders correctly', () => {
  const { container } = render(<Highlights />)
  expect(container).toMatchSnapshot()
})
