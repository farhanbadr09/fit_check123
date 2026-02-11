import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDashboardStats,
  fetchDailyBreakdown,
  setSelectedPeriod,
} from '../store/slices/dashboardSlice';
import Header from '../components/layout/Header';
import StatsCard from '../components/common/StatsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const periodOptions = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '14d', label: 'Last 14 Days' },
  { value: '30d', label: 'Last 30 Days' },
];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, dailyBreakdown, selectedPeriod, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDailyBreakdown(selectedPeriod));
  }, [dispatch, selectedPeriod]);

  const handlePeriodChange = (period) => {
    dispatch(setSelectedPeriod(period));
  };

  return (
    <div>
      <Header title="Dashboard" subtitle="Overview of your API usage and statistics" />

      <div className="p-4 sm:p-6 space-y-6">
        {loading && !stats ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {stats && (
                <>
                  <StatsCard {...stats.period} />
                  <StatsCard {...stats.avgDailyRequests} />
                  <StatsCard {...stats.totalRequests} />
                </>
              )}
            </div>

            <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-text-primary">Daily Breakdown</h2>
                  <p className="text-sm text-text-secondary">API request volume over time</p>
                </div>
                <div className="flex items-center gap-2">
                  {periodOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handlePeriodChange(opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                        ${
                          selectedPeriod === opt.value
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyBreakdown} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="successful"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      name="Successful"
                    />
                    <Bar
                      dataKey="failed"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                      name="Failed"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
