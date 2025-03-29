import { render } from '@testing-library/react'
import GdesiIcon from '../GdesiIcon';

it('GdesiIcon renders correctly', () => {
  const { container } = render(<GdesiIcon />)
  expect(container).toMatchSnapshot()
})
