import { render } from '@testing-library/react'
import BoardSettings from '../settings';

jest.mock("next/navigation");

const board = {
    id:1,
    name:"Operations",
    manager:2,
    users:[1,3,2],
    columns:[
        {id:1,title:"To Do",cards:[]},
        {id:2,title:"Doing",cards:[]},
        {id:3,title:"Done",cards:[]}
    ]
}

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(board),
    }),
  );

it('BoardSettings renders correctly', async () => {
  const { container } = render(<BoardSettings boardId={1}/>)
  expect(container).toMatchSnapshot()
})


