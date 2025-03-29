import { render } from '@testing-library/react'
import TaskList from '../taskList';

jest.mock("next/navigation");

const tasks = [{
    "id": 4,
    "boardid": 1,
    "title": "Sample Task 4",
    "type": "Document",
    "assignee": 3,
    "description": "Some description",
    "links": [],
    "comments": [],
    "status": "To Do",
    "deadline": "2025-04-28T00:00:00.000Z",
    "starteddate": null,
    "completeddate": null
  },
  {
    "id": 15,
    "boardid": 1,
    "title": "Newly created task",
    "type": "Meeting",
    "assignee": 3,
    "description": "some new task",
    "links": [],
    "comments": [],
    "status": "To Do",
    "deadline": "2025-03-30T00:00:00.000Z",
    "starteddate": null,
    "completeddate": null
  },
]


global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(tasks),
    }),
  );

it('TaskList renders correctly', async () => {
  const { container } = render(<TaskList boardId={1} />)
  expect(container).toMatchSnapshot()
})


