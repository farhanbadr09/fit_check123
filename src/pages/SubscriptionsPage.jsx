import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubscriptions } from '../store/slices/subscriptionSlice';
import {
  fetchRequestHistory,
} from '../store/slices/dashboardSlice';
import Header from '../components/layout/Header';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Search, Filter, Calendar } from 'lucide-react';

const SubscriptionsPage = () => {
  const dispatch = useDispatch();
  const { subscriptions, loading: subLoading } = useSelector((state) => state.subscriptions);
  const { requestHistory, requestHistoryMeta } = useSelector((state) => state.dashboard);

  const [activeTab, setActiveTab] = useState('history');
  const [ipFilter, setIpFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchRequestHistory({
        ip: ipFilter,
        status: statusFilter,
        dateFrom,
        dateTo,
        page,
        limit: 10,
      })
    );
  }, [dispatch, ipFilter, statusFilter, dateFrom, dateTo, page]);

  const handleApplyFilters = () => {
    setPage(1);
    dispatch(
      fetchRequestHistory({
        ip: ipFilter,
        status: statusFilter,
        dateFrom,
        dateTo,
        page: 1,
        limit: 10,
      })
    );
  };

  return (
    <div>
      <Header title="Subscriptions" subtitle="Manage subscriptions and view request history" />

      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
              ${activeTab === 'history'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
          >
            Request History
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
              ${activeTab === 'subscriptions'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
          >
            Subscriptions
          </button>
        </div>

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
              <div className="flex items-center bg-bg-input rounded-lg px-3 py-2 border border-border flex-1 w-full lg:w-auto">
                <Search className="w-4 h-4 text-text-muted mr-2" />
                <input
                  type="text"
                  placeholder="Search by IP address..."
                  value={ipFilter}
                  onChange={(e) => setIpFilter(e.target.value)}
                  className="bg-transparent text-sm outline-none w-full text-text-primary placeholder:text-text-muted"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                </select>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-bg-input border border-border rounded-lg px-3 py-2">
                    <Calendar className="w-4 h-4 text-text-muted mr-2" />
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="bg-transparent text-sm outline-none text-text-primary"
                    />
                  </div>
                  <span className="text-text-muted text-sm">to</span>
                  <div className="flex items-center bg-bg-input border border-border rounded-lg px-3 py-2">
                    <Calendar className="w-4 h-4 text-text-muted mr-2" />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="bg-transparent text-sm outline-none text-text-primary"
                    />
                  </div>
                </div>

                <button
                  onClick={handleApplyFilters}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Apply
                </button>
              </div>
            </div>

            {requestHistory.length === 0 ? (
              <EmptyState title="No requests found" message="No API requests match your current filters." />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:table-cell">
                          Package
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                          IP Address
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">
                          Response Time
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light">
                      {requestHistory.map((req) => (
                        <tr key={req.id} className="hover:bg-bg-input transition-colors">
                          <td className="py-3 px-4">
                            <span className="text-sm text-text-primary">{req.dateTime}</span>
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                              {req.package}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm font-mono text-text-secondary">
                              {req.ipAddress}
                            </span>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <span className="text-sm text-text-secondary">{req.responseTime}</span>
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={req.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination meta={requestHistoryMeta} onPageChange={setPage} />
              </>
            )}
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
            {subLoading ? (
              <LoadingSpinner className="py-20" />
            ) : subscriptions.length === 0 ? (
              <EmptyState title="No subscriptions" message="No active subscriptions found." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        User
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Package
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden lg:table-cell">
                        Next Billing
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-bg-input transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-text-primary">{sub.user}</p>
                            <p className="text-xs text-text-muted">{sub.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {sub.package}
                          </span>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="text-sm font-semibold text-text-primary">
                            ${sub.amount.toFixed(2)}/mo
                          </span>
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <span className="text-sm text-text-secondary">
                            {sub.nextBilling
                              ? new Date(sub.nextBilling).toLocaleDateString()
                              : '—'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={sub.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
