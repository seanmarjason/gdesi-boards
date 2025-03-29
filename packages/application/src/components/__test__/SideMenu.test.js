import { render } from '@testing-library/react'
import SideMenu from '../SideMenu';

test('SideMenu renders correctly', () => {
  const { container } = render(<SideMenu />)
  expect(container).toMatchSnapshot()
})
