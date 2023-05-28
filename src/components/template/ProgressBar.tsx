import { ProgressPercentProps } from './ProgressCircle';
import { progress, dealt } from './styles';

export const ProgressBar = ({ progressPercent }: ProgressPercentProps) => (
  <>
    <div css={progress(progressPercent.percentage)}>
      <div css={dealt(progressPercent.percentage)} />
    </div>
    <p>{progressPercent.percentage}%</p>
  </>
);
