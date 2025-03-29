import { render } from '@testing-library/react'
import MenuContent from '../MenuContent';

it('MenuContent renders correctly', () => {
  const { container } = render(<MenuContent />)
  expect(container).toMatchSnapshot()
})
