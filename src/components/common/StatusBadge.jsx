const statusStyles = {
  Paid: 'bg-success/10 text-success',
  Success: 'bg-success/10 text-success',
  Active: 'bg-success/10 text-success',
  Completed: 'bg-success/10 text-success',
  Pending: 'bg-accent/10 text-accent',
  Processing: 'bg-info/10 text-info',
  Overdue: 'bg-danger/10 text-danger',
  Failed: 'bg-danger/10 text-danger',
  Cancelled: 'bg-text-muted/10 text-text-muted',
  Expired: 'bg-text-muted/10 text-text-muted',
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
