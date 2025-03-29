import { render } from '@testing-library/react'
import { TaskCard } from '../TaskCard';

jest.mock("next/navigation");
jest.mock("@hello-pangea/dnd");

const card = {
    id: 1,
    title: '',
    type: '',
    assignee: '',
}
 
test('TaskCard renders correctly', () => {
  const { container } = render(<TaskCard card={card} index={1} />)
  expect(container).toMatchSnapshot()
})
