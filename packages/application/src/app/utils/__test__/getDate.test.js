import { 
    getEndOfWeek,
    getNextWeek,
    getLastWeek,
    getDate
} from '../getDate'

test('getEndOfWeek returns end of week', () => {
  expect(getEndOfWeek('2025-01-01T00:00:00.000Z')).toBe('2025-01-05');
});

test('getNextWeek returns 7 days ahead', () => {
  expect(getNextWeek('2025-01-01T00:00:00.000Z')).toBe('2025-01-08');
});

test('getLastWeek returns 7 days back', () => {
  expect(getLastWeek('2025-01-08T00:00:00.000Z')).toBe('2025-01-01');
});

test('getDate returns 7 days back', () => {
  Date.now = jest.fn(() => new Date("2025-01-01T00:00:00.000Z"));
  expect(getDate()).toBe('2025-01-01');
});
