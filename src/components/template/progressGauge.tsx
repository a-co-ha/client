import { useGetProgressPercent } from '@/hooks/queries/template/useGetProgressPercent';
import { Dealt, Progress, gaugeContainer } from './styles';

export const ProgressGauge = ({ pageId = '' }) => {
  const { data: progressPercent } = useGetProgressPercent(pageId);
  return (
    <div css={gaugeContainer}>
      <p>{progressPercent?.percentage}</p>
      <Progress>
        <Dealt dealt={progressPercent?.percentage} />
      </Progress>
    </div>
  );
};
