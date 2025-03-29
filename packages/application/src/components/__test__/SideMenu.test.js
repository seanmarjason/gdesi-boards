import { render } from '@testing-library/react'
import SideMenu from '../SideMenu';

it('SideMenu renders correctly', () => {
  const { container } = render(<SideMenu />)
  expect(container).toMatchSnapshot()
})
