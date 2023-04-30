import { useGetProgressPercent } from '@/hooks/queries/template/useGetProgressPercent';
import { dealt, progress, gaugeContainer } from './styles';

export const ProgressGauge = ({ pageId = '' }) => {
  const { data: progressPercent } = useGetProgressPercent(pageId);
  console.log(
    '🚀 ~ file: progressGauge.tsx:6 ~ ProgressGauge ~ progressPercent:',
    progressPercent
  );
  return (
    <div css={gaugeContainer}>
      <div css={progress(progressPercent?.percentage)}>
        <div css={dealt(progressPercent?.percentage)} />
      </div>
      <p>{progressPercent?.percentage}</p>
    </div>
  );
};
