import { render } from '@testing-library/react'
import Boards from '../boards';

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(''),
    }),
  );
  
 
test('Boards renders correctly', () => {
  const { container } = render(<Boards />)
  expect(container).toMatchSnapshot()
})
