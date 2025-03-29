import { render } from '@testing-library/react'
import MenuButton from '../MenuButton';

test('MenuButton renders correctly', () => {
  const { container } = render(<MenuButton />)
  expect(container).toMatchSnapshot()
})
