import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import * as styles from './styles';

export const MainCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div css={styles.mainCalendar}>
      <h3 css={styles.commonTitleStyle}>캘린더</h3>
      <Calendar
        locale="ko"
        onChange={() => onChange}
        value={value}
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
      {/* <div css={styles.content}>내용</div> */}
    </div>
  );
};
