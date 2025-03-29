import { render } from '@testing-library/react'
import { Column } from '../Column';

jest.mock("@hello-pangea/dnd");
  
const column = {
    id: '',
    title: '',
    cards: []
}
 
test('Column renders correctly', () => {
  const { container } = render(<Column column={column} handleColumnChange={jest.fn()} />)
  expect(container).toMatchSnapshot()
})
