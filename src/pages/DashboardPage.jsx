import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDashboardStats,
  fetchDailyBreakdown,
  setSelectedPeriod,
} from '../store/slices/dashboardSlice';
import StatsCard from '../components/common/StatsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, ChevronDown } from 'lucide-react';

const periodOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '14d', label: 'Last 14 Days' },
  { value: '30d', label: 'Last 30 Days' },
];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, dailyBreakdown, selectedPeriod, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDailyBreakdown(selectedPeriod));
  }, [dispatch, selectedPeriod]);

  const handlePeriodChange = (e) => {
    dispatch(setSelectedPeriod(e.target.value));
  };

  return (
    <div className="p-6 md:p-10 animate-fade-in">
      {/* Header Area */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-gray-100 bg-gray-200 overflow-hidden shadow-sm">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-[10px] font-black uppercase">
                {user?.name ? user.name.substring(0, 2) : 'JD'}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && !stats ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard label="Period" value={stats?.period?.value || 'Last 7 Days'} color="blue" />
            <StatsCard label="Average Daily Requests" value={stats?.avgDailyRequests?.value || '0.29'} color="green" />
            <StatsCard label="Total Requests" value={stats?.totalRequests?.value || '2'} color="pink" />
          </div>

          {/* Graph Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Daily Breakdown</h2>
                <p className="text-sm text-gray-400 font-medium">Last 7 Days</p>
              </div>

              <div className="flex items-center gap-2 border border-blue-100 bg-blue-50/10 rounded-lg px-3 py-1.5 text-gray-600">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  className="appearance-none bg-transparent outline-none text-xs font-bold cursor-pointer"
                >
                  {periodOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>

            <div className="h-[350px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyBreakdown} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    axisLine={{ stroke: '#f0f0f0' }}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #f0f0f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="successful"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#3b82f6' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
