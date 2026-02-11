import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubscriptions } from '../store/slices/subscriptionSlice';
import { Zap, Calendar, CreditCard, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SubscriptionsPage = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading } = useSelector((state) => state.subscriptions);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  // Calculate usage percentage for the progress bar
  const usagePercentage = user ? (user.totalRequests / user.monthlyLimit) * 100 : 0;
  const requestsLeft = user ? user.monthlyLimit - user.totalRequests : 0;

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Subscriptions</h1>
        <p className="text-slate-500 font-medium">View your plan details and usage history</p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Plan Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="w-24 h-24 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Plan</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">{user?.plan || 'Advanced'}</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-500 uppercase">
              Active
            </span>
          </div>
        </div>

        {/* Next Billing Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Calendar className="w-24 h-24 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-50 rounded-lg">
              <Calendar className="w-5 h-5 text-pink-500" />
            </div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Next Billing</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              {user?.planExpiry ? new Date(user.planExpiry).toLocaleDateString('en-GB') : '3/12/2026'}
            </h2>
          </div>
        </div>

        {/* Total Usage Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CreditCard className="w-24 h-24 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-cyan-500" />
            </div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Usage (Current)</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900">{user?.totalRequests || 1}</h2>
            <p className="text-slate-400 text-sm font-medium transition-colors">Requests used this period</p>
          </div>
        </div>
      </div>

      {/* Subscription History Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Subscription History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Plan Details</th>
                <th className="text-left py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="text-left py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Usage</th>
                <th className="text-right py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* Using the first subscription to match the image style */}
              <tr className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-6 px-6">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {user?.plan || 'Advanced'}
                  </span>
                </td>
                <td className="py-6 px-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-emerald-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Start: {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Feb 9, 2026'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-rose-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>End: {user?.planExpiry ? new Date(user.planExpiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Mar 12, 2026'}</span>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-6 min-w-[300px]">
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[12px] font-medium text-slate-600">
                        Requests: <span className="text-slate-900 font-bold">{user?.totalRequests || 1} / {user?.monthlyLimit || 10000}</span>
                      </span>
                      <span className="text-[12px] font-bold text-pink-400">{requestsLeft.toLocaleString()} left</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-300 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.max(usagePercentage, 1)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-6 px-6 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-pink-100 text-pink-500 uppercase ring-1 ring-pink-200">
                    <Sparkles className="w-3 h-3" />
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Mockup */}
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <p className="text-[13px] font-medium text-slate-400">
            Showing 1 to 1 of 1 subscriptions
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-[13px] font-bold shadow-lg shadow-primary/20">
              1
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
