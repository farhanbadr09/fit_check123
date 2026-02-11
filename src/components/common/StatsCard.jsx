import { TrendingUp, Calendar, Activity } from 'lucide-react';

const colorMap = {
  blue: {
    bg: 'bg-card-blue',
    icon: Calendar,
  },
  green: {
    bg: 'bg-card-green',
    icon: TrendingUp,
  },
  pink: {
    bg: 'bg-card-pink',
    icon: Activity,
  },
};

const StatsCard = ({ label, value, subtext, color = 'blue' }) => {
  const config = colorMap[color] || colorMap.blue;
  const Icon = config.icon;

  return (
    <div className={`${config.bg} rounded-xl p-5 sm:p-6 text-white animate-fade-in`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/80 text-sm font-medium">{label}</span>
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      <p className="text-white/70 text-sm mt-1">{subtext}</p>
    </div>
  );
};

export default StatsCard;
