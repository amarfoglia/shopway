const ONE_SEC_IN_MS = 1000;
const ONE_MIN_IN_MS = ONE_SEC_IN_MS * 60;
const ONE_HOUR_IN_MS = ONE_MIN_IN_MS * 60;
const ONE_DAY_IN_MS = 24 * ONE_HOUR_IN_MS;

const getDateFromNow = (minutes: number) => new Date(Date.now() + minutes * ONE_MIN_IN_MS);

export {
  ONE_DAY_IN_MS,
  ONE_HOUR_IN_MS,
  ONE_MIN_IN_MS,
  ONE_SEC_IN_MS,
  getDateFromNow
};
