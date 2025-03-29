import { render } from '@testing-library/react'
import { TaskForm } from '../TaskForm';

jest.mock("@mui/x-date-pickers/DatePicker");
jest.mock("@mui/x-date-pickers/LocalizationProvider");
jest.mock("@mui/x-date-pickers/AdapterDayjs");
jest.mock("dayjs");

const task = {
    status: 'status',
    title: 'title',
    deadline: 'deadline',
    type: 'Document',
    assignee: 'assignee',
    description: 'description',
    links: [],
    comments: [],
}
 
it('TaskForm renders correctly', () => {
  const { container } = render(
    <TaskForm 
        task={task}
        boardId={1}
        users={[{id: 1, name: 'user'}]}
        currentUser={'user'}
        saveTask={jest.fn()}
        checkComment={jest.fn()}
    />
  )
  expect(container).toMatchSnapshot()
})
