import { useGetProgressPercent } from '@/hooks/queries/template/useGetProgressPercent';
import {
  gaugeContainer,
  singleChart,
  circularChart,
  circleBg,
  circle,
  percentage,
} from './styles';

export const ProgressGauge = ({ pageId = '' }) => {
  const { data: progressPercent } = useGetProgressPercent(pageId);

  return (
    progressPercent && (
      <div css={gaugeContainer}>
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
      </div>
    )
  );
};
