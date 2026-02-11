import { Calendar, TrendingUp, Activity } from 'lucide-react';

const colorMap = {
  blue: {
    bg: 'bg-[#2db2c3]',
    icon: Calendar,
  },
  green: {
    bg: 'bg-[#2ea12e]',
    icon: TrendingUp,
  },
  pink: {
    bg: 'bg-[#cc66cc]',
    icon: Activity,
  },
};

const StatsCard = ({ label, value, color = 'blue' }) => {
  const config = colorMap[color] || colorMap.blue;
  const Icon = config.icon;

  return (
    <div className={`${config.bg} rounded-xl p-5 text-white flex justify-between h-[115px] shadow-sm`}>
      <div className="flex flex-col justify-between">
        <span className="text-white/90 text-[13px] font-medium tracking-tight">{label}</span>
        <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      </div>
      <div>
        <Icon className="w-8 h-8 text-white opacity-90" />
      </div>
    </div>
  );
};

export default StatsCard;
