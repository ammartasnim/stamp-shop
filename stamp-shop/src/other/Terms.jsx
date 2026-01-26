import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  const sectionTitle = "text-xl font-bold text-slate-900 mb-4 flex items-center gap-2";
  const tableHeader = "px-4 py-3 bg-slate-50 text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200";
  const tableCell = "px-4 py-4 text-sm text-slate-600 border-b border-slate-100";

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-white px-8 py-10 border-b border-slate-100 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Please review our delivery and payment policies. These terms ensure a secure and efficient experience for collectors worldwide.
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          
          {/* 1. Delivery Modes Section */}
          <section>
            <h2 className={sectionTitle}>
              <i className="bi bi-truck text-blue-600"></i>
              Delivery Modes
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Shipping within Tunisia and to international destinations is managed according to the customer's preference via <strong>Rapid-Poste (Express Mail)</strong> or <strong>Registered Mail</strong>.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className={tableHeader}>Service</th>
                    <th className={tableHeader}>Destination</th>
                    <th className={tableHeader}>Timeframe</th>
                    <th className={tableHeader}>Fees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Rapid Poste */}
                  <tr>
                    <td className={`${tableCell} font-bold text-slate-900`} rowSpan="3">Rapid-Poste</td>
                    <td className={tableCell}>Tunisia</td>
                    <td className={tableCell}>1 working day</td>
                    <td className={tableCell}>5 DT (Up to 500g)</td>
                  </tr>
                  <tr>
                    <td className={tableCell}>Europe & America</td>
                    <td className={tableCell}>2-3 working days</td>
                    <td className={tableCell}>25 $ US (Up to 1kg)</td>
                  </tr>
                  <tr>
                    <td className={tableCell}>International</td>
                    <td className={tableCell}>4-5 working days</td>
                    <td className={tableCell}>25 $ US (Up to 1kg)</td>
                  </tr>
                  {/* Registered Mail */}
                  <tr className="bg-slate-50/30">
                    <td className={`${tableCell} font-bold text-slate-900`} rowSpan="2">Registered Mail</td>
                    <td className={tableCell}>Tunisia</td>
                    <td className={tableCell}>2-3 working days</td>
                    <td className={tableCell}>2.5 DT (Up to 500g)</td>
                  </tr>
                   <tr>
                    <td className={tableCell}>Europe & America</td>
                    <td className={tableCell}>5-9 working days</td>
                    <td className={tableCell}>10 $ US (Up to 1kg)</td>
                  </tr>
                  <tr>
                    <td className={tableCell}>International</td>
                    <td className={tableCell}>7-15 working days</td>
                    <td className={tableCell}>10 $ US (Up to 1kg)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. Payment Modes Section */}
          <section className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
            <h2 className={sectionTitle}>
              <i className="bi bi-credit-card text-blue-600"></i>
              Payment Methods
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">In Tunisia</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <i className="bi bi-check2-circle text-blue-500"></i> E-Dinar
                  </li>
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <i className="bi bi-check2-circle text-blue-500"></i> Mandate
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">International</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <i className="bi bi-check2-circle text-blue-500"></i> Credit Cards (Visa/Mastercard)
                  </li>
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <i className="bi bi-check2-circle text-blue-500"></i> Credit Transfer
                  </li>
                  <li className="flex items-center gap-2 text-slate-600 text-sm">
                    <i className="bi bi-check2-circle text-blue-500"></i> International Mandate
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center pt-6">
            <p className="text-xs text-slate-400">
              All times are calculated from the date the order is finalized. By placing an order, you agree to these logistics and financial terms.
            </p>
            <Link to="/catalogue" className="inline-block mt-6 text-blue-600 font-bold text-sm hover:underline">
              ← Return to Catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;