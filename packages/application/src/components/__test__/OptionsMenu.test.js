import { render } from '@testing-library/react'
import OptionsMenu from '../OptionsMenu';

it('OptionsMenu renders correctly', () => {
  const { container } = render(<OptionsMenu />)
  expect(container).toMatchSnapshot()
})
