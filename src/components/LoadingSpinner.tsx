import davLogo from '../assets/dav-group-logo.jpg';
import vedritamLogo from '../assets/vedritam-logo.jpg';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({
  fullScreen = true,
  label = 'Loading DAV Civil Services...',
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`brand-preloader ${fullScreen ? 'preloader-fullscreen' : 'preloader-inline'}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="preloader-bg-glow" />
      <div className="preloader-content">
        {/* Glowing dual ring spinner container */}
        <div className="preloader-spinner-ring">
          <div className="spinner-outer-ring" />
          <div className="spinner-inner-ring" />
          <div className="preloader-logo-badge">
            <img src={davLogo} alt="DAV Group" className="preloader-logo dav" />
            <span className="preloader-logo-divider" />
            <img src={vedritamLogo} alt="Vedritam" className="preloader-logo vedritam" />
          </div>
        </div>

        {/* Text and Taglines */}
        <div className="preloader-text-block">
          <h3 className="preloader-title">DAV Civil Services</h3>
          <p className="preloader-subtitle">Residential Program • Vedritam</p>
          <p className="preloader-sanskrit">तमसो मा ज्योतिर्गमय</p>
          {label && <p className="preloader-label">{label}</p>}
        </div>

        {/* Animated Progress Bar */}
        <div className="preloader-progress-track">
          <div className="preloader-progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
