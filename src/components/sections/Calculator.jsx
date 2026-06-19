import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  COST_PER_KW,
  UNITS_PER_KW_PER_MONTH,
  UNIT_RATE,
  SUBSIDY,
} from '../../constants/calculator';

function roundToHalf(n) {
  return Math.max(1, Math.round(n * 2) / 2);
}

function getSubsidy(kw, propertyType) {
  if (propertyType !== 'Residential') return 0;
  if (kw <= 1) return SUBSIDY['1'];
  if (kw <= 2) return SUBSIDY['2'];
  return SUBSIDY['3plus'];
}

function formatINR(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

function ResultCard({ label, value, highlight }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-[#16A34A] text-white' : 'bg-gray-50 text-gray-800'}`}>
      <p className={`text-xs font-medium uppercase tracking-wide ${highlight ? 'text-green-100' : 'text-gray-400'}`}>
        {label}
      </p>
      <p className={`text-xl font-bold mt-1 ${highlight ? 'text-white' : 'text-gray-900'}`}>{value}</p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-gray-700">Year {label}</p>
        <p className="text-[#16A34A]">Net Savings: {formatINR(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function Calculator() {
  const [inputMode, setInputMode] = useState('bill'); // 'bill' | 'units'
  const [bill, setBill] = useState('');
  const [units, setUnits] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    const rawUnits = inputMode === 'bill'
      ? (parseFloat(bill) || 0) / UNIT_RATE
      : (parseFloat(units) || 0);
    if (rawUnits <= 0) return null;
    const systemKw = roundToHalf(rawUnits / UNITS_PER_KW_PER_MONTH);
    const totalCost = systemKw * COST_PER_KW;
    const subsidy = getSubsidy(systemKw, propertyType);
    const netCost = totalCost - subsidy;
    const monthlySavings = systemKw * UNITS_PER_KW_PER_MONTH * UNIT_RATE;
    const annualSavings = monthlySavings * 12;
    const payback = netCost / annualSavings;
    const totalSavings25 = annualSavings * 25 - netCost;

    // Year-by-year chart data
    const chartData = Array.from({ length: 25 }, (_, i) => {
      const year = i + 1;
      const cumulativeSavings = annualSavings * year;
      const netSavings = cumulativeSavings - netCost;
      return { year, netSavings };
    });

    return {
      systemKw,
      totalCost,
      subsidy,
      netCost,
      monthlySavings,
      annualSavings,
      payback,
      totalSavings25,
      chartData,
    };
  }, [bill, units, inputMode, propertyType]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (results) setShowResults(true);
  };

  return (
    <section className="py-20 bg-white" id="calculator">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-sm font-semibold rounded-full mb-3">
            Solar Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Calculate Your Solar Savings
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Enter your electricity details to get an instant estimate of your solar system size, savings, and payback period.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-6"
          >
            <h3 className="font-bold text-gray-900 text-lg mb-5">Your Details</h3>
            <form onSubmit={handleCalculate} className="space-y-4">
              {/* Input mode toggle */}
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                {['bill', 'units'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => { setInputMode(mode); setShowResults(false); }}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      inputMode === mode
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {mode === 'bill' ? 'Monthly Bill (₹)' : 'Monthly Units'}
                  </button>
                ))}
              </div>

              {inputMode === 'bill' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Electricity Bill</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                    <input
                      type="number"
                      value={bill}
                      onChange={(e) => { setBill(e.target.value); setShowResults(false); }}
                      placeholder="e.g. 3000"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#16A34A] text-gray-900"
                      min="100"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Consumption</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={units}
                      onChange={(e) => { setUnits(e.target.value); setShowResults(false); }}
                      placeholder="e.g. 400"
                      className="w-full px-4 pr-16 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#16A34A] text-gray-900"
                      min="10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">units</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => { setPropertyType(e.target.value); setShowResults(false); }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#16A34A] text-gray-700 bg-white"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#16A34A] text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
              >
                Calculate Savings →
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              Estimates only. Final quote depends on site survey, roof type, and DISCOM approval.
            </p>
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {showResults && results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <ResultCard label="Recommended System" value={`${results.systemKw} kW`} />
                  <ResultCard label="Total System Cost" value={formatINR(results.totalCost)} />
                  {results.subsidy > 0 ? (
                    <ResultCard label="PM Surya Ghar Subsidy" value={`-${formatINR(results.subsidy)}`} highlight />
                  ) : (
                    <div className="col-span-2 bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
                      No central subsidy for {propertyType}. Benefits include accelerated depreciation (up to 40% Y1) and net billing.
                    </div>
                  )}
                  <ResultCard label="Net Cost After Subsidy" value={formatINR(results.netCost)} />
                  <ResultCard label="Monthly Savings" value={formatINR(results.monthlySavings)} />
                  <ResultCard label="Payback Period" value={`${results.payback.toFixed(1)} years`} />
                  <ResultCard label="25-Year Net Savings" value={formatINR(results.totalSavings25)} highlight />
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Cumulative Savings Over 25 Years</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={results.chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" tick={{ fontSize: 10 }} tickFormatter={(v) => `Y${v}`} interval={4} />
                      <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="netSavings" radius={[3, 3, 0, 0]}>
                        {results.chartData.map((entry) => (
                          <Cell
                            key={entry.year}
                            fill={entry.netSavings < 0 ? '#DC2626' : '#16A34A'}
                            fillOpacity={0.8}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-gray-400 mt-2">
                    Red bars = before payback period. Green bars = pure savings.
                  </p>
                </div>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 bg-[#16A34A] text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Get Exact Quote →
                </button>
              </div>
            ) : (
              <div className="h-full min-h-[300px] bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                <div className="text-6xl mb-4">☀️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">See Your Savings</h3>
                <p className="text-gray-500 text-sm">
                  Enter your electricity bill or monthly units on the left to calculate your potential solar savings.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
                  {[
                    { label: 'Avg. Unit Rate', value: `₹${UNIT_RATE}/unit` },
                    { label: 'Cost Per kW', value: `₹${(COST_PER_KW / 1000).toFixed(0)}K` },
                    { label: 'Max Subsidy', value: '₹78,000' },
                    { label: 'Output/kW', value: `${UNITS_PER_KW_PER_MONTH} units/mo` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white rounded-xl p-3">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-bold text-gray-800 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
