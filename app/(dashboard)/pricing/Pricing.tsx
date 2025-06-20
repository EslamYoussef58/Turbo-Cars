// app/pricing/page.tsx
"use client";

import Head from "next/head";
import { NextPage } from "next";

const PricingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Service Pricing - Maintenance Center</title>
        <meta
          name="description"
          content="Transparent and fair pricing for car maintenance and repairs."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8 text-white">
       
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4 text-[#dc2626]">Our Service Prices</h1>
          <p className="text-lg text-gray-300">
            We believe in providing high-quality services at competitive prices.
            At Maintenance Center, we offer car care solutions that match your
            budget—without compromising quality.
          </p>
        </section>

       
        <SectionHeader title="Price List" />
        <div className="overflow-x-auto mb-20">
          <table className="min-w-full border border-gray-700 rounded-md text-left">
            <thead className="bg-gray-800">
              <tr>
                <Th>Service</Th>
                <Th>Price (USD)</Th>
                <Th>Estimated Duration</Th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                >
                  <Td>{service.name}</Td>
                  <Td>{service.price}</Td>
                  <Td>{service.duration}</Td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-400 mt-4">
            * Prices are approximate and may vary depending on vehicle type or
            issue. Contact us for an accurate quote.
          </p>
        </div>

        
        <SectionHeader title="Maintenance Packages" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                {pkg.name}
              </h3>
              <p className="text-blue-400 text-2xl font-bold mb-4">
                {pkg.price}
              </p>
              <ul className="space-y-2 mb-6 list-disc list-inside text-gray-300">
                {pkg.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold transition">
                Book Now
              </button>
            </div>
          ))}
        </div>

        
        <SectionHeader title="Special Offers" />
        <div className="space-y-4">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-30 border-l-4 border-[#dc2626] p-4"
            >
              <h4 className="text-[#dc2626] font-semibold">{offer.title}</h4>
              <p className="text-gray-300">{offer.description}</p>
              {offer.validUntil && (
                <p className="text-sm text-[#dc2626] mt-1">
                  Valid until: {offer.validUntil}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};


const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
);

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-xs font-medium text-gray-300 uppercase tracking-wider">
    {children}
  </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
    {children}
  </td>
);


const services = [
  { name: "Engine Oil Change", price: "300 - 600", duration: "30 minutes" },
  {
    name: "Brake Inspection and Repair",
    price: "500 - 1200",
    duration: "1-2 hours",
  },
  {
    name: "Full Periodic Maintenance",
    price: "1000 - 2000",
    duration: "2-3 hours",
  },
  { name: "AC System Repair", price: "800 - 1500", duration: "2-4 hours" },
  {
    name: "Tire Change",
    price: "200 per tire",
    duration: "20 minutes per tire",
  },
  {
    name: "Comprehensive Electrical Check",
    price: "400 - 800",
    duration: "1-1.5 hours",
  },
  { name: "Fuel System Cleaning", price: "700 - 1200", duration: "1-2 hours" },
];

const packages = [
  {
    name: "Basic Maintenance Package",
    price: "500 USD",
    features: [
      "Engine oil change",
      "Air and fuel filter inspection",
      "Tire pressure check",
      "Fluid levels inspection",
    ],
  },
  {
    name: "Intermediate Maintenance Package",
    price: "1000 USD",
    features: [
      "All Basic Package features",
      "Brake system inspection",
      "Suspension system inspection",
      "Spark plugs cleaning",
    ],
  },
  {
    name: "Comprehensive Maintenance Package",
    price: "1500 USD",
    features: [
      "All Intermediate Package features",
      "Comprehensive electrical check",
      "Fuel system cleaning",
      "Interior car cleaning",
    ],
  },
];

const offers = [
  {
    title: "20% Discount on First Maintenance for New Customers!",
    description:
      "Get 20% off on your first maintenance service booked with us.",
    validUntil: "December 31, 2025",
  },
  {
    title: "Free Inspection with Repair Service Booking",
    description:
      "Get a free vehicle inspection when booking any repair service over 1000 USD.",
    validUntil: "November 30, 2025",
  },
  {
    title: "Free Maintenance After 5 Visits",
    description:
      "Get a free maintenance service after completing 5 paid visits to our center.",
    validUntil: "Ongoing",
  },
];

export default PricingPage;
