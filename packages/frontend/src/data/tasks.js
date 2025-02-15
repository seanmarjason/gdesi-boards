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
        status: '',
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
            { name: 'Proposal for this test', type: 'Document', url: 'http://google.com/' }
        ],
        comments: [
            { author: '', dateCreated: '', dateModified: '', comment: '' }
        ],
        status: '',
        deadline: '',
        estimate: ''
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
        status: '',
        deadline: '',
        estimate: ''
    }
]

export const taskTypeMenuItems = [
    'Document',
    'Meeting',
    'Design',
]

export const taskAssigneeMenuItems = [
    'Bob Dylan',
    'Freddie Mercury',
    'Bon Jovi',
    'Mr Miyagi',
]
