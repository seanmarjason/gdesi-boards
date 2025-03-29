import { render } from '@testing-library/react'
import OptionsMenu from '../OptionsMenu';

test('OptionsMenu renders correctly', () => {
  const { container } = render(<OptionsMenu />)
  expect(container).toMatchSnapshot()
})
