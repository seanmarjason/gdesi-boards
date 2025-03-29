import { render } from '@testing-library/react'
import NewBoard from '../new-board';

jest.mock("next/navigation");
jest.mock("next-auth/react", () => ({
    useSession: jest.fn().mockReturnValue({
        data: '', status: '', update: ''
    })
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(''),
    }),
  );
 
it('NewBoard renders correctly', () => {
  const { container } = render(<NewBoard />)
  expect(container).toMatchSnapshot()
})
