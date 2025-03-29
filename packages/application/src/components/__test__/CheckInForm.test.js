import { render } from '@testing-library/react'
import CheckInForm from '../CheckInForm';

jest.mock("next/navigation");
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(''),
    }),
  );
  
 
test('CheckInForm renders correctly', () => {
  const { container } = render(<CheckInForm boardId="1" />)
  expect(container).toMatchSnapshot()
})
