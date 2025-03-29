import { render } from '@testing-library/react'
import App from '../app';

const session = {
  user: {
    email: 'test@gdesi.io'
  }
}
 
it('App renders correctly', () => {
  const { container } = render(<App session={session} />)
  expect(container).toMatchSnapshot()
})
