import { useGetProgressPercent } from '@/hooks/queries/template/useGetProgressPercent';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { ProgressBar } from './ProgressBar';
import { ProgressCircle } from './ProgressCircle';
import { gaugeContainer } from './styles';

export const ProgressGauge = ({ pageId = '' }) => {
  const { data: progressPercent } = useGetProgressPercent(pageId);
  const { type: inTemplate } = useGetUrlInfo();

  return progressPercent ? (
    <div css={gaugeContainer}>
      {inTemplate ? (
        <ProgressBar progressPercent={progressPercent} />
      ) : (
        <ProgressCircle progressPercent={progressPercent} />
      )}
    </div>
  ) : null;
};
