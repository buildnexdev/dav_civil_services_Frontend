import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({
  fullScreen = false,
  label = 'Loading...',
  size = 'md',
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`loading-spinner-wrap ${fullScreen ? 'loading-spinner-fullscreen' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={`loading-spinner loading-spinner-${size}`} aria-hidden="true" />
      {label ? <p className="loading-spinner-label">{label}</p> : null}
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingSpinner;
