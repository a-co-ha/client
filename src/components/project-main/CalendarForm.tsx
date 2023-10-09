import { useRecoilState } from 'recoil';
import { calendarAddScheduleState } from '@/recoil/project/atom';
import { useForm } from 'react-hook-form';
import { useCalendarForm } from '@/hooks/form/useCalendarForm';
import * as styles from './styles';
import type { AddSchedule } from '@/pages/api/main/type';
import { useEffect } from 'react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePostCalendarSchedule } from '@/hooks/queries/main/postCalendarSchedule';
import { Loading } from '../loading/Loading';

export const CalendarForm = ({
  channelId,
  clickDate,
}: {
  channelId: string | string[] | undefined;
  clickDate: string;
}) => {
  const [isCalendarFormOpen, setIsCalendarFormOpen] = useRecoilState(
    calendarAddScheduleState
  );
  const { mutate: postScheduleMutate, isLoading } =
    usePostCalendarSchedule(channelId);

  const methods = useForm<AddSchedule>({
    defaultValues: {
      addSchedule: '',
    },
    mode: `onSubmit`,
  });

  const { addSchedule, error, isSubmitting } = useCalendarForm({
    control: methods.control,
  });
  useEffect(() => {
    if (isCalendarFormOpen === false) {
      methods.reset();
    }
  }, [isCalendarFormOpen]);

  const onSubmit = (content: AddSchedule) => {
    postScheduleMutate({ content: content.addSchedule, date: clickDate });
    setIsCalendarFormOpen(false);
    methods.reset();
  };

  return (
    <div css={styles.mainCalendarAddSchedule(isCalendarFormOpen)}>
      <h2 css={styles.mainCalendarAddScheduleTitle}>{clickDate}</h2>
      <div css={styles.mainCalendarAddScheduleContentBox}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <textarea
            css={styles.mainCalendarAddScheduleTextarea(!!error)}
            value={addSchedule.value}
            onChange={addSchedule.onChange}
            spellCheck={false}
            placeholder={`내용을 입력해주세요`}
          />
          <button disabled={isSubmitting}>
            {isLoading ? (
              <Loading position="absolute" />
            ) : (
              <FontAwesomeIcon
                icon={faCirclePlus}
                size={`2xl`}
                color={`#ffd6dc`}
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
