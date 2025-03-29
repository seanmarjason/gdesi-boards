import { render, screen } from '@testing-library/react'
import Board from '../board';

const data = [
    {id: 1, name: 'To Do', cards: []},
    {id: 2, name: 'Doing', cards: []},
    {id: 3, name: 'Done', cards: []},
]

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    }),
  );


 
test('Board renders correctly', async () => {
  const { container } = render(<Board />)
  await screen.findByText("Your Team's Work")

  expect(container).toMatchSnapshot()
})
