import dayjs from 'dayjs';

export const getTimeValue = (createdAt: string) => {
  let format;
  if (createdAt.match(/Z/)) {
    format = createdAt;
  } else {
    format = `20${createdAt.substring(0, 2)}-${createdAt.substring(
      3,
      5
    )}-${createdAt.substring(6, 8)}T${createdAt.substring(9)}`;
  }

  const date = dayjs(format);
  const nowDate = dayjs();
  const hour = date.get(`hour`);
  const minute = date.get(`minute`);
  const displayHour =
    hour !== 0 && hour <= 12 ? hour : hour === 0 ? 12 : hour - 12;
  const displayminute = minute < 10 ? `0${minute}` : minute;
  const isAm = hour < 12 ? `오전` : `오후`;
  const isToday =
    nowDate.isSame(date, 'day') === true
      ? `오늘`
      : date.isSame(nowDate.subtract(1, 'day'), 'day') === true
      ? `어제`
      : date.isBefore(nowDate.subtract(1, 'day')) === true
      ? date.format(`YYYY.MM.DD`)
      : null;
  const time = `${isToday} ${isAm} ${displayHour}:${displayminute}`;
  return time;
};
