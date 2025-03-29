import { render } from '@testing-library/react'
import AppAppBar from '../AppAppBar';
 
test('AppAppBar renders correctly with user', () => {
  const { container } = render(<AppAppBar user="some-user" />)
  expect(container).toMatchSnapshot()
})
