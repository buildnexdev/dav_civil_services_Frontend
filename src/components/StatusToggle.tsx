type Status = 'Active' | 'Inactive';

type Props = {
  value: Status;
  onChange: (status: Status) => void;
  disabled?: boolean;
};

const StatusToggle = ({ value, onChange, disabled }: Props) => (
  <div className="status-toggle">
    <button
      type="button"
      className={`btn btn-sm ${value === 'Active' ? 'status-on-active' : 'btn-outline'}`}
      disabled={disabled}
      onClick={() => onChange('Active')}
    >
      Active
    </button>
    <button
      type="button"
      className={`btn btn-sm ${value === 'Inactive' ? 'status-on-inactive' : 'btn-outline'}`}
      disabled={disabled}
      onClick={() => onChange('Inactive')}
    >
      Inactive
    </button>
  </div>
);

export default StatusToggle;
