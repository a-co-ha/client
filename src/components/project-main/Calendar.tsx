import { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import * as styles from './styles';
import type { Value, Range } from 'react-calendar/dist/cjs/shared/types';
import { HelpModal } from '@/hooks/useHelpModal';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export const MainCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mark, setMark] = useState(['2023-06-18']);

  const onChangeHandler = (
    value: Value,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChange(value);
  };
  const onClickHandler = () => {
    setIsClicked(true);
  };

  const onDeleteHandler = () => {
    isDeleteBtnClicked
      ? setIsDeleteBtnClicked(false)
      : setIsDeleteBtnClicked(true);
  };

  const isOpenHandler = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
    setIsDeleteBtnClicked(false);
  };
  console.log(`벨류`, value);
  // const date = dayjs(value[0]).get('date');
  // console.log(`변환`, date);
  return (
    <div css={styles.mainCalendarBox}>
      <div css={styles.mainCalendarTitleBox}>
        <CalendarDaysIcon width={25} height={25} />
        <h3 css={styles.mainCalendarTitle}>캘린더</h3>
        <HelpModal
          content={`날짜를 선택하고 일정을 추가해보세요`}
          direction={`left`}
        />
      </div>
      <div css={styles.mainCalendar}>
        <Calendar
          locale="ko"
          onChange={onChangeHandler}
          value={value}
          // selectRange
          // allowPartialRange
          showNeighboringMonth={false}
          formatDay={(locale, date) => dayjs(date).format('DD')}
          onClickDay={onClickHandler}
          tileContent={({ date, view }) => {
            let html = [];
            if (mark.find((x) => x === dayjs(date).format(`YYYY-MM-DD`))) {
              html.push(<div css={styles.calendarScheduleDot}></div>);
            }
            return <>{html}</>;
          }}
        />
        <div css={styles.mainCalendarSchedule(isOpen)}>
          <h2 css={styles.mainCalendarScheduleTitle}>2023.06.20</h2>
          <div css={styles.mainCalendarScheduleContentBox}>
            {['1221하기', '4344343434'].map((e, i) => {
              return (
                <div key={i} css={styles.mainCalendarScheduleContent}>
                  <ul>
                    <li>
                      {e}
                      <button
                        css={styles.calendarScheduleDeleteBtn(
                          isDeleteBtnClicked
                        )}
                        onClick={onDeleteHandler}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                      <div
                        css={styles.calendarScheduleDeleteConfirmBtn(
                          isDeleteBtnClicked
                        )}
                      >
                        <button onClick={onDeleteHandler}>삭제</button>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div css={styles.content}>내용</div> */}
      <div css={styles.calendarScheduleBtnBox}>
        <button css={styles.calendarScheduleAddBtn}>일정 추가</button>
        <button
          css={styles.calendarScheduleViewBtn(isClicked)}
          onClick={isOpenHandler}
          disabled={!isClicked}
        >
          {isOpen ? `닫기` : `일정 보기`}
        </button>
      </div>
    </div>
  );
};

// [
//   {
//     작성자:
//     내용:
//     날짜:
//     channelId:
//   }
// ]
// 2032-05-21
