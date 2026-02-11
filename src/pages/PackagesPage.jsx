import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPackages } from '../store/slices/packageSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Check, Star, ShieldCheck, Zap, Globe, MessageSquare, ChevronDown, Plus, Minus } from 'lucide-react';

const PricingCard = ({ pkg, isCurrentPlan, billingCycle }) => {
  const isPopular = pkg.popular;
  const isEnterprise = pkg.name === 'Enterprise';

  // Calculate price based on billing cycle (simulated 20% discount for yearly)
  const displayPrice = billingCycle === 'yearly'
    ? Math.floor(pkg.price * 0.8 * 12)
    : pkg.price;

  return (
    <div
      className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full
        ${isPopular
          ? 'bg-[#18181b] text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] scale-105 z-10'
          : 'bg-white text-gray-900 border border-gray-100 shadow-sm hover:shadow-xl'}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d946ef] to-[#7c3aed] text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
          Best Value
        </div>
      )}

      <div className="mb-8">
        <h3 className={`text-sm font-black uppercase tracking-widest mb-4 ${isPopular ? 'text-primary-light' : 'text-gray-400'}`}>
          {pkg.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black tracking-tight">${displayPrice}</span>
          <span className={`text-sm font-bold ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
            /{billingCycle === 'yearly' ? 'year' : 'mo'}
          </span>
        </div>
        <p className={`mt-4 text-sm font-medium leading-relaxed ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
          {pkg.description}
        </p>
      </div>

      <div className={`h-[1px] w-full mb-8 ${isPopular ? 'bg-white/10' : 'bg-gray-100'}`} />

      <ul className="space-y-4 mb-10 flex-1">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${isPopular ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'}`}>
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
            <span className={`text-sm font-semibold tracking-tight ${isPopular ? 'text-gray-300' : 'text-gray-600'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        disabled={isCurrentPlan}
        className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-300
          ${isCurrentPlan
            ? 'bg-white/5 text-gray-500 border border-white/10 cursor-default'
            : isPopular
              ? 'bg-gradient-to-r from-[#d946ef] to-[#7c3aed] text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]'
              : 'bg-gray-900 text-white hover:bg-black hover:scale-[1.02]'}`}
      >
        {isCurrentPlan ? 'Current plan active' : isEnterprise ? 'Contact sales' : 'Upgrade now'}
      </button>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">{question}</span>
        <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary/10 text-primary rotate-180' : 'text-gray-400'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const PackagesPage = () => {
  const dispatch = useDispatch();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { packages, loading } = useSelector((state) => state.packages);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const faqs = [
    { question: "Can I change plans at any time?", answer: "Yes, you can upgrade or downgrade your plan at any time from your dashboard. Changes will be reflected in your next billing cycle." },
    { question: "What happens if I exceed my API limit?", answer: "We'll notify you when you reach 80% and 100% of your limit. You can either upgrade or pay for extra requests as needed." },
    { question: "Do you offer custom enterprise solutions?", answer: "Absolutely. Our Enterprise plan includes dedicated support, custom AI training, and on-premise deployment options." },
    { question: "Is there a free trial available?", answer: "All our plans come with a 14-day free trial so you can test all the premium features before committing." }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 animate-fade-in">
      {/* Premium Header Section */}
      <div className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8">
          <Zap className="w-4 h-4 text-[#d946ef] fill-[#d946ef]" />
          <span className="text-[11px] font-black uppercase tracking-widest text-[#111827]">Scaling made simple</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-[#111827] mb-6 tracking-tight leading-tight">
          Flexible plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d946ef] to-[#7c3aed]">every growth stage</span>
        </h1>

        <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto mb-12">
          Unlock the full potential of AI virtual try-ons. Save 20% on yearly plans.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-bold transition-colors ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 bg-gray-200 rounded-full p-1 relative transition-colors hover:bg-gray-300"
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 transform ${billingCycle === 'yearly' ? 'translate-x-6 bg-primary' : ''}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold transition-colors ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>Yearly</span>
            <span className="bg-success/10 text-success text-[10px] font-black uppercase px-2 py-0.5 rounded-md">Save 20%</span>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center"><LoadingSpinner /></div>
        ) : (
          packages.map((pkg) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              isCurrentPlan={user?.plan === pkg.name}
              billingCycle={billingCycle}
            />
          ))
        )}
      </div>

      {/* Trust & Features Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-[#18181b] rounded-[40px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Everything you need to <br />scale your ecommerce</h2>
              <p className="text-gray-400 text-base font-medium mb-10 leading-relaxed">
                Join 5,000+ brands using LookCheck to power their virtual shopping experience.
              </p>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, label: "Enterprise Security", sub: "SOC2 Type II compliant" },
                  { icon: Globe, label: "Global CDN", sub: "Fast loads everywhere" },
                  { icon: Zap, label: "99.9% Uptime", sub: "Reliability guaranteed" },
                  { icon: MessageSquare, label: "Expert Support", sub: "24/7 dedicated help" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <item.icon className="w-6 h-6 text-primary-light" />
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    <span className="text-[11px] text-gray-500 font-bold uppercase">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-md">
              <h3 className="text-xl font-black mb-8">Frequently Asked Questions</h3>
              <div className="space-y-0 text-white">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-white/5 last:border-0">
                    <button className="w-full py-5 flex items-center justify-between text-left group">
                      <span className="text-sm font-bold text-gray-200">{faq.question}</span>
                      <Plus className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </button>
                    {/* Simplified for internal layout, actual FAQ above uses state */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actual FAQ Section for Page */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Got questions?</h2>
          <p className="text-gray-500 font-medium">Everything you need to know about LookCheck pricing.</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;

