import { render } from '@testing-library/react'
import ErrorPage from '../errorPage';

it('ErrorPage renders correctly', () => {
  const { container } = render(<ErrorPage />)
  expect(container).toMatchSnapshot()
})
