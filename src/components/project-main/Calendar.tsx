import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import * as styles from './styles';
import type { Value } from 'react-calendar/dist/cjs/shared/types';
import { HelpModal } from '@/hooks/useHelpModal';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { useGetCalendarSchedule } from '@/hooks/queries/main/getCalendarSchedule';
import { useDeleteCalendarSchedule } from '@/hooks/queries/main/deleteCalendarSchedule';
import {
  calendarScheduleState,
  calendarAddScheduleState,
} from '@/recoil/project/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CalendarForm } from './CalendarForm';

export const MainCalendar = () => {
  const { channelId } = useGetUrlInfo();
  const { data: scheduleDate } = useGetCalendarSchedule(channelId);
  const deleteSchedule = useDeleteCalendarSchedule(channelId);
  const scheduleValue = useRecoilValue(calendarScheduleState);
  const [value, onChange] = useState<Value>(new Date());
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarFormOpen, setIsCalendarFormOpen] = useRecoilState(
    calendarAddScheduleState
  );
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
  const [clickDate, setClickDate] = useState('');

  const onChangeHandler = (value: Value) => {
    onChange(value);
  };
  const onClickHandler = (value: Date) => {
    setIsClicked(true);
    setClickDate(dayjs(value).format(`YYYY-MM-DD`));
  };

  const addScheduleHandler = () => {
    isCalendarFormOpen
      ? setIsCalendarFormOpen(false)
      : setIsCalendarFormOpen(true);
    setIsOpen(false);
  };

  const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const label = target.getAttribute(`aria-label`);
    deleteSchedule.mutate(Number(label));
  };

  const trashCanHandler = () => {
    isDeleteBtnClicked
      ? setIsDeleteBtnClicked(false)
      : setIsDeleteBtnClicked(true);
  };
  const isOpenHandler = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
    setIsDeleteBtnClicked(false);
    setIsCalendarFormOpen(false);
  };
  return (
    <>
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
            showNeighboringMonth={false}
            formatDay={(locale, date) => dayjs(date).format('DD')}
            onClickDay={onClickHandler}
            tileContent={({ date, view }) => {
              let html = [];
              if (
                scheduleValue.find(
                  (x) => x.date === dayjs(date).format(`YYYY-MM-DD`)
                )
              ) {
                html.push(
                  <div key={view} css={styles.calendarScheduleDot}></div>
                );
              }
              return <>{html}</>;
            }}
          />
          <CalendarForm channelId={channelId} clickDate={clickDate} />
          <div css={styles.mainCalendarSchedule(isOpen)}>
            <h2 css={styles.mainCalendarScheduleTitle}>
              {clickDate}
              <FontAwesomeIcon icon={faTrashCan} onClick={trashCanHandler} />
            </h2>
            <div>
              {scheduleValue &&
                [scheduleValue.filter((e) => e.date == clickDate)][0].map(
                  (e, i) => {
                    return (
                      <div key={i} css={styles.mainCalendarScheduleContent}>
                        <ul>
                          <li>
                            {e.content}
                            <button
                              css={styles.calendarScheduleDeleteBtn(
                                isDeleteBtnClicked
                              )}
                            ></button>
                            <div
                              css={styles.calendarScheduleDeleteConfirmBtn(
                                isDeleteBtnClicked
                              )}
                            >
                              <button
                                aria-label={String(e.id)}
                                onClick={onDeleteHandler}
                              >
                                삭제
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        </div>
        <div css={styles.calendarScheduleBtnBox}>
          <button
            data-testid={`addBtn`}
            css={styles.calendarScheduleAddBtn(isClicked)}
            onClick={addScheduleHandler}
            disabled={!isClicked}
          >
            {isCalendarFormOpen ? `닫기` : `일정 추가`}
          </button>
          <button
            css={styles.calendarScheduleViewBtn(isClicked)}
            onClick={isOpenHandler}
            disabled={!isClicked}
          >
            {isOpen ? `닫기` : `일정 보기`}
          </button>
        </div>
      </div>
    </>
  );
};
