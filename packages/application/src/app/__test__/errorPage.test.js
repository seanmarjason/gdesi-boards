import { render } from '@testing-library/react'
import ErrorPage from '../errorPage';

test('ErrorPage renders correctly', () => {
  const { container } = render(<ErrorPage />)
  expect(container).toMatchSnapshot()
})
