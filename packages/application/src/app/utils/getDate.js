import moment from 'moment';

export const getEndOfWeek = (date) => {
  const parsedDate = moment(date);
  return (parsedDate.day() == 0 ? parsedDate : parsedDate.day(7)).format('YYYY-MM-DD')
}

export const getNextWeek = (date) => {
  const parsedDate = moment(date);
  return parsedDate.add(7, 'days').format('YYYY-MM-DD');
}

export const getLastWeek = (date) => {
  const parsedDate = moment(date);
  return parsedDate.subtract(7, 'days').format('YYYY-MM-DD');
}

export const getDate = () => {
  return moment().format('YYYY-MM-DD');
}