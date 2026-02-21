import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  CartesianGrid,
  Legend
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    age: "",
    gender: ""
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams(filters).toString();

      const res = await apiRequest(`/analytics?${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setData(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div className="glass-card p-4 md:p-6 rounded-xl flex flex-col lg:flex-row lg:gap-4 lg:items-end lg:justify-between">
          <div className="mb-4 lg:mb-0 flex-1">
            <h3 className="text-lg md:text-xl font-semibold">Filters</h3>
            <p className="text-sm text-muted mt-1">Refine the analytics view</p>
          </div>

          <div className="flex gap-2 md:gap-3 flex-wrap">
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="form-input text-sm md:text-base"
            />

            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="form-input text-sm md:text-base"
            />

            <select
              name="age"
              onChange={handleChange}
              className="form-input text-sm md:text-base"
            >
              <option value="">All Ages</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
            </select>

            <select
              name="gender"
              onChange={handleChange}
              className="form-input text-sm md:text-base"
            >
              <option value="">All Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button
              onClick={fetchAnalytics}
              className="btn-primary text-sm md:text-base"
            >
              Apply
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center text-muted">Loading data...</div>
        )}
        {!loading && !data && (
          <div className="text-center text-muted">No data available</div>
        )}
        {!loading && data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Feature Usage</h2>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.featureUsage} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="feature" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.9)' }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {data.featureUsage?.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={['#5661ff', '#6b7cff', '#7b8fff', '#8b9fff', '#9bafff'][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Time Trend</h2>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data.timeTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.9)' }} />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#5661ff" 
                    strokeWidth={3} 
                    dot={{ fill: '#5661ff', r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;