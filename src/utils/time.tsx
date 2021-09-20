import moment from 'moment';

const getTimeLeft = (expireAt: Date): moment.Duration => {
  const startDate = moment(Date.now());
  const timeEnd = moment(expireAt);
  return moment.duration(timeEnd.diff(startDate));
};

export { getTimeLeft };
