import { render } from '@testing-library/react'
import NavbarBreadcrumbs from '../NavbarBreadcrumbs';

it('NavbarBreadcrumbs renders correctly', () => {
  const { container } = render(<NavbarBreadcrumbs />)
  expect(container).toMatchSnapshot()
})
