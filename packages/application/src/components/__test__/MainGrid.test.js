import { render } from '@testing-library/react'
import MainGrid from '../MainGrid';

jest.mock("@hello-pangea/dnd");

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(''),
    }),
  );
  
 
const data = [
    {id: 1, name: 'To Do', cards: []},
    {id: 2, name: 'Doing', cards: []},
    {id: 3, name: 'Done', cards: []},
]

test('MainGrid renders correctly', () => {
  const { container } = render(<MainGrid data={data} updateCardStatus={jest.fn()} boardId={1}  />)
  expect(container).toMatchSnapshot()
})
