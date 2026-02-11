import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices, setFilters } from '../store/slices/billingSlice';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import {
  Search,
  FileText,
  Download,
  Eye,
  CreditCard,
  Calendar,
  ArrowUpRight,
  MoreVertical,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';

const BillingCard = ({ icon: Icon, title, value, subtext, gradient }) => (
  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${gradient || 'bg-gray-50 text-gray-400'} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6" />
      </div>
      <button className="text-gray-300 hover:text-gray-900 transition-colors">
        <ArrowUpRight className="w-5 h-5" />
      </button>
    </div>
    <div>
      <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>
      <p className="text-sm font-bold text-gray-500 mt-1">{subtext}</p>
    </div>
  </div>
);

const PaymentMethodCard = () => (
  <div className="bg-[#18181b] rounded-3xl p-6 text-white relative overflow-hidden shadow-xl group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-700" />
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center border border-white/5">
            <span className="text-[8px] font-black uppercase italic tracking-tighter">VISA</span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Success Payment</span>
        </div>
        <CreditCard className="w-5 h-5 opacity-40" />
      </div>

      <div className="mt-8 mb-4">
        <p className="text-lg font-black tracking-[0.2em]">•••• •••• •••• 4242</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-[9px] font-black uppercase tracking-tighter opacity-40 mb-0.5">Expires</p>
          <p className="text-xs font-bold">12 / 2026</p>
        </div>
        <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors border border-white/5">
          Update
        </button>
      </div>
    </div>
  </div>
);

const BillingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { invoices, meta, loading, filters } = useSelector((state) => state.billing);
  const [activeTab, setActiveTab] = useState('History');

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
    <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen animate-fade-in">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-[#111827] tracking-tight mb-2">Billing & Invoices</h1>
          <p className="text-gray-500 font-medium">Manage your subscription, secure payments, and billing history.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white text-gray-900 font-bold text-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download All
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#d946ef] text-white font-bold text-sm rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <BillingCard
          icon={CheckCircle2}
          title="Current Plan"
          value={user?.plan || 'Advanced'}
          subtext={`Expires on ${new Date(user?.planExpiry || '2026-03-15').toLocaleDateString()}`}
          gradient="bg-success/10 text-success"
        />
        <BillingCard
          icon={Calendar}
          title="Next Invoice"
          value="Mar 15, 2026"
          subtext="Amount: $99.00 USD"
          gradient="bg-info/10 text-info"
        />
        <BillingCard
          icon={Clock}
          title="Total Spent"
          value="$1,452.00"
          subtext="Since June 2025"
          gradient="bg-warning/10 text-warning"
        />
        <PaymentMethodCard />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="p-6 md:p-8 border-b border-gray-50 bg-gray-50/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-2xl w-fit">
              {['History', 'Upcoming'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group w-full sm:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Invoice number, email..."
                  value={filters.search}
                  onChange={handleSearch}
                  className="pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all w-full sm:w-64 placeholder:text-gray-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-white border border-gray-200 rounded-2xl overflow-x-auto no-scrollbar">
                {['all', 'Paid', 'Pending', 'Overdue'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusFilter(status)}
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap
                      ${filters.status === status
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-32 flex justify-center"><LoadingSpinner /></div>
        ) : invoices.length === 0 ? (
          <div className="py-32">
            <EmptyState
              icon={FileText}
              title="No billing data available"
              message="We couldn't find any invoices matching your current filters."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Invoice</th>
                  <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                  <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Plan</th>
                  <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                  <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map((invoice, idx) => (
                  <tr
                    key={invoice.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">{invoice.id}</p>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                            {new Date(invoice.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase">
                          {invoice.user.substring(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-700">{invoice.user}</p>
                          <p className="text-[11px] font-medium text-gray-400">{invoice.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {invoice.package}
                      </span>
                    </td>
                    <td className="py-5 px-8">
                      <p className="text-sm font-black text-gray-900">${invoice.amount.toFixed(2)}</p>
                    </td>
                    <td className="py-5 px-8">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="py-5 px-8 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-primary border border-transparent hover:border-gray-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-primary border border-transparent hover:border-gray-100">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-6 bg-gray-50/30 border-t border-gray-50">
          <Pagination meta={meta} onPageChange={handlePageChange} />
        </div>
      </div>

      {/* Trust Message */}
      <div className="flex items-center justify-center gap-2 py-4">
        <Clock className="w-4 h-4 text-gray-300" />
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300">Last updated today at 5:30 PM PST</p>
      </div>
    </div>
  );
};

export default BillingPage;

