import { ProgressPercentData } from '@/hooks/queries/template/useGetProgressPercent';
import {
  singleChart,
  circularChart,
  circleBg,
  circle,
  percentage,
} from './styles';

export interface ProgressPercentProps {
  progressPercent: ProgressPercentData;
}

export const ProgressCircle = ({ progressPercent }: ProgressPercentProps) => (
  <div css={singleChart}>
    <svg viewBox="0 0 36 36" css={circularChart}>
      <path
        css={circleBg}
        d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        css={circle(progressPercent.percentage)}
        strokeDasharray={`${progressPercent.percentage}, 100`}
        d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" css={percentage}>
        {progressPercent.percentage}%
      </text>
    </svg>
  </div>
);
