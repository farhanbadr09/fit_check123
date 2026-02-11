import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices, setFilters } from '../store/slices/billingSlice';
import Header from '../components/layout/Header';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Search, FileText, Download, Eye } from 'lucide-react';

const BillingPage = () => {
  const dispatch = useDispatch();
  const { invoices, meta, loading, filters } = useSelector((state) => state.billing);

  useEffect(() => {
    dispatch(fetchInvoices(filters));
  }, [dispatch, filters]);

  const handleSearch = (e) => {
    dispatch(setFilters({ search: e.target.value, page: 1 }));
  };

  const handleStatusFilter = (status) => {
    dispatch(setFilters({ status, page: 1 }));
  };

  const handlePageChange = (page) => {
    dispatch(setFilters({ page }));
  };

  return (
    <div>
      <Header title="Billing & Invoices" subtitle="Manage your billing and view invoices" />

      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center bg-bg-input rounded-lg px-3 py-2 border border-border flex-1 sm:flex-none sm:w-72">
                <Search className="w-4 h-4 text-text-muted mr-2" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={filters.search}
                  onChange={handleSearch}
                  className="bg-transparent text-sm outline-none w-full text-text-primary placeholder:text-text-muted"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {['all', 'Paid', 'Pending', 'Overdue', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize
                    ${
                      filters.status === status
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                    }`}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : invoices.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No invoices found"
              message="Try adjusting your search criteria or filters."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        User
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">
                        Package
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden lg:table-cell">
                        Date
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {invoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="hover:bg-bg-input transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-primary">
                            {invoice.id}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              {invoice.user}
                            </p>
                            <p className="text-xs text-text-muted">{invoice.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {invoice.package}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-semibold text-text-primary">
                            ${invoice.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={invoice.status} />
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <span className="text-sm text-text-secondary">
                            {new Date(invoice.date).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-text-secondary" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-text-secondary" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination meta={meta} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
