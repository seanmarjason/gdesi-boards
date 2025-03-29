import { render } from '@testing-library/react'
import Task from '../task';

jest.mock("next/navigation");

const task = 
{
    "id": 1,
    "boardid": 1,
    "title": "Roadmap for project delivery",
    "type": "Document",
    "assignee": 3,
    "description": "This is a description of the task \"Roadmap for project delivery\" that describes the task)",
    "links": [],
    "comments": [
      {
        "id": 16,
        "taskid": 1,
        "author": "manager",
        "datecreated": "2025-03-28T14:13:23.425Z",
        "comment": "I've finished this"
      },
      {
        "id": 17,
        "taskid": 1,
        "author": "BOT",
        "datecreated": "2025-03-28T14:13:24.725Z",
        "comment": "Could you please provide more details about what you have finished? For instance, what specific task or project are you referring to? Additionally, do you need any feedback or assistance with the next steps?"
      }
    ],
    "status": "To Do",
    "deadline": "2025-02-28T00:00:00.000Z",
    "starteddate": null,
    "completeddate": null
}


global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(task),
    }),
  );

it('Task renders correctly', async () => {
  const { container } = render(<Task task={1} boardId={1} userName={'user'} />)
  expect(container).toMatchSnapshot()
})


