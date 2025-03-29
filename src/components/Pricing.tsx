import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '999',
    features: [
      'Single page website',
      'Basic SEO optimization',
      'Mobile responsive design',
      '2 weeks delivery',
      '1 month support'
    ]
  },
  {
    name: 'Professional',
    price: '1,999',
    features: [
      'Multi-page website',
      'Advanced SEO optimization',
      'Custom animations',
      'E-commerce integration',
      '3 months support'
    ]
  },
  {
    name: 'Enterprise',
    price: '1,599',
    features: [
      'Full-scale web application',
      'Custom backend development',
      'Advanced security features',
      'Priority support',
      'Dedicated project manager'
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Transparent Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose the perfect plan for your project
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-4xl font-bold text-indigo-600">${plan.price}</p>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 block w-full bg-indigo-600 text-white text-center py-3 rounded-md hover:bg-indigo-700"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}