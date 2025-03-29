import React from 'react';
import { Globe, Smartphone, Code, Database } from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    icon: Globe
  },
  {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps for iOS and Android.',
    icon: Smartphone
  },
  {
    title: 'Custom Software',
    description: 'Tailored software solutions to meet your specific business needs.',
    icon: Code
  },
  {
    title: 'Backend Systems',
    description: 'Scalable and secure backend infrastructure and APIs.',
    icon: Database
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We offer comprehensive software development services to help your business grow
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="h-12 w-12 text-indigo-600 mx-auto">
                  <Icon className="h-full w-full" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-500 text-center">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}