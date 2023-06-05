import { useGetProgressPercent } from '@/hooks/queries/template/useGetProgressPercent';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { ProgressBar } from './ProgressBar';
import { ProgressCircle } from './ProgressCircle';
import { gaugeContainer } from './styles';

interface ProgressGaugeProps {
  pageId: string;
}
export const ProgressGauge = ({ pageId }: ProgressGaugeProps) => {
  const { type: inTemplate } = useGetUrlInfo();
  const { data: progressPercent } = useGetProgressPercent(pageId, inTemplate);

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
