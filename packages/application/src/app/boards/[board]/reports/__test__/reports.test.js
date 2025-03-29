import { render } from '@testing-library/react'
import Reports from '../reports';

jest.mock("next/navigation");

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(''),
    }),
  );

test('Reports renders correctly', async () => {
  const { container } = render(<Reports boardId={1} reportDate={'2025-01-01'}/>)
  expect(container).toMatchSnapshot()
})
