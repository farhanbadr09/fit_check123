import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPackages } from '../store/slices/packageSlice';
import Header from '../components/layout/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Check, Star } from 'lucide-react';

const colorClasses = {
  blue: {
    border: 'border-card-blue',
    bg: 'bg-card-blue',
    text: 'text-card-blue',
    badge: 'bg-card-blue/10 text-card-blue',
    button: 'bg-card-blue hover:bg-card-blue/90',
    check: 'text-card-blue',
  },
  purple: {
    border: 'border-card-purple',
    bg: 'bg-card-purple',
    text: 'text-card-purple',
    badge: 'bg-card-purple/10 text-card-purple',
    button: 'bg-card-purple hover:bg-card-purple/90',
    check: 'text-card-purple',
  },
  pink: {
    border: 'border-card-pink',
    bg: 'bg-card-pink',
    text: 'text-card-pink',
    badge: 'bg-card-pink/10 text-card-pink',
    button: 'bg-card-pink hover:bg-card-pink/90',
    check: 'text-card-pink',
  },
  green: {
    border: 'border-card-green',
    bg: 'bg-card-green',
    text: 'text-card-green',
    badge: 'bg-card-green/10 text-card-green',
    button: 'bg-card-green hover:bg-card-green/90',
    check: 'text-card-green',
  },
};

const PackagesPage = () => {
  const dispatch = useDispatch();
  const { packages, loading } = useSelector((state) => state.packages);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  return (
    <div>
      <Header title="Packages" subtitle="Choose the plan that's right for you" />

      <div className="p-4 sm:p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Simple, transparent pricing
          </h2>
          <p className="text-text-secondary mt-2 max-w-lg mx-auto">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => {
              const colors = colorClasses[pkg.color] || colorClasses.blue;
              const isCurrentPlan = user?.plan === pkg.name;

              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-xl border-2 p-6 transition-all hover:shadow-lg animate-fade-in
                    ${pkg.popular ? colors.border + ' shadow-lg' : 'border-border'}`}
                >
                  {pkg.popular && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${colors.bg} text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1`}>
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} mb-3`}>
                      {pkg.name}
                    </span>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-text-primary">${pkg.price}</span>
                      <span className="text-text-secondary text-sm">/{pkg.period}</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-2">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.check}`} />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors
                      ${
                        isCurrentPlan
                          ? 'bg-gray-100 text-text-secondary cursor-default'
                          : `${colors.button} text-white`
                      }`}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Get Started'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagesPage;
