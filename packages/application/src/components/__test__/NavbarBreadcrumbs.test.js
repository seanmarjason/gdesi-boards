import { render } from '@testing-library/react'
import NavbarBreadcrumbs from '../NavbarBreadcrumbs';

test('NavbarBreadcrumbs renders correctly', () => {
  const { container } = render(<NavbarBreadcrumbs />)
  expect(container).toMatchSnapshot()
})
