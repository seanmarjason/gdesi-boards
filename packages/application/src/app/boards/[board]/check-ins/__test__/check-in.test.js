import { render } from '@testing-library/react'
import CheckIn from '../check-in';

const data = [
    { id: 18, date: "2025-03-28T00:00:00.000Z", rating: 0 },
    { id: 19, date: "2025-03-28T00:00:00.000Z", rating: 3 }
]

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({data}),
    }),
  );


 
test('CheckIn renders correctly', async () => {
  const { container } = render(<CheckIn boardId={1}/>)
  expect(container).toMatchSnapshot()
})
