export const tasks = [
    {
        id: 'abc-123',
        title: 'This is a test',
        type: 'Document',
        assignee: '',
        description: '',
        links: [
        ],
        comments: [
            { author: '', dateCreated: '', dateModified: '', comment: '' }
        ],
        status: 'To Do',
        deadline: '',
        estimate: ''
    },
    {
        id: 'abc-456',
        title: 'This is another test',
        type: 'Meeting',
        assignee: '',
        description: '',
        links: [
            { id: 'abc-456_link-0', name: 'Proposal for this test', type: 'Document', url: 'http://google.com/' }
        ],
        comments: [
            { author: 'Bob Dylan', dateCreated: '2024-12-20T00:00:00.000Z', dateModified: '2025-02-15T12:00:00.000Z', comment: 'This is a comment on a task ticket' }
        ],
        status: 'Doing',
        deadline: '2025-02-28 02:00:00',
        estimate: '5'
    },
    {
        id: 'xyz-456',
        title: 'This is one more test',
        type: 'Design',
        assignee: '',
        description: '',
        links: [
            { name: '', type: '', url: '' }
        ],
        comments: [
            { author: '', dateCreated: '', dateModified: '', comment: '' }
        ],
        status: 'Done',
        deadline: '',
        estimate: ''
    }
]

export const taskTypeMenuItems = [
    'Document',
    'Meeting',
    'Design',
]
