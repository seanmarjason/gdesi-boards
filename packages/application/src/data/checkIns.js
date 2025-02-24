export const checkIns = {
    data: [
        { id: '1', date: '2025-02-28 02:00:00', rating: 3 },
        { id: '2', date: '2025-02-21 02:00:00', rating: 3 },
        { id: '3', date: '2025-02-14 02:00:00', rating: 3 },
        { id: '4', date: '2025-02-07 02:00:00', rating: 3 },
        { id: '5', date: '2025-01-31 02:00:00', rating: 3 },
        { id: '6', date: '2025-01-24 02:00:00', rating: 3 },
        { id: '7', date: '2025-01-17 02:00:00', rating: 3 },
        { id: '8', date: '2025-01-10 02:00:00', rating: 3 },
        { id: '9', date: '2025-01-03 02:00:00', rating: 3 },
        { id: '10', date: '2024-12-27 02:00:00', rating: 3 },
        { id: '11', date: '2024-12-20 02:00:00', rating: 3 },
    ],
    pagination: {
        "total_records": 11,
        "current_page": 1,
        "total_pages": 2,
        "next_page": 2,
        "prev_page": null
    }
}


export const checkIn = {
    id: '1',
    date: '2025-02-28 02:00:00',
    rating: 3,
    thisWeek: {
        tasksCompleted: ['xyz-456'],
        tasksStarted: ['abc-456'],
        tasksIntroduced: ['abc-123'],
        tasksNotProgressed: ['some-task'],
        comments: ["I'm not sure what to say in this comment"]
    },
    nextWeek: {
        due: ['abc-456'],
        comments: []
    },
    other: []
}