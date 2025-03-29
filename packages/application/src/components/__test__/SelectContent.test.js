import { render } from '@testing-library/react'
import SelectContent from '../SelectContent';

it('SelectContent renders correctly', () => {
  const { container } = render(<SelectContent />)
  expect(container).toMatchSnapshot()
})
