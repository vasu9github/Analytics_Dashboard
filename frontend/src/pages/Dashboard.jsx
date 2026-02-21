import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../api";
import { trackEvent } from "../api/track";

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
  CartesianGrid
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

  const handleApply = async () => {
    try {
      await trackEvent("filter_apply");
      fetchAnalytics();
    } catch (err) {
      console.log(err);
    }
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

          <div className="flex gap-2 md:gap-3 flex-wrap w-full lg:w-auto">

            <div className="relative w-full sm:w-auto min-w-[140px]">
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="form-input w-full pr-10 appearance-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                📅
              </span>
            </div>

            <div className="relative w-full sm:w-auto min-w-[140px]">
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="form-input w-full pr-10 appearance-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                📅
              </span>
            </div>

            <select
              name="age"
              onChange={handleChange}
              className="form-input w-full sm:w-auto min-w-[140px]"
            >
              <option value="">All Ages</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
            </select>

            <select
              name="gender"
              onChange={handleChange}
              className="form-input w-full sm:w-auto min-w-[140px]"
            >
              <option value="">All Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button
              onClick={handleApply}
              className="btn-primary w-full sm:w-auto"
            >
              Apply
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center text-muted">Loading data...</div>
        )}

        {!loading && data && data.featureUsage?.length === 0 && (
          <div className="text-center text-muted">
            No data for selected filters
          </div>
        )}

        {!loading && data && data.featureUsage?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="font-semibold mb-4">Feature Usage</h2>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.featureUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="feature" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="count"
                    onClick={async (entry) => {
                      if (!entry?.feature) return;
                      await trackEvent(`bar_click:${entry.feature}`);
                    }}
                  >
                    {data.featureUsage.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          ["#5661ff", "#6b7cff", "#7b8fff", "#8b9fff", "#9bafff"][
                            index % 5
                          ]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card p-4 md:p-6 rounded-xl">
              <h2 className="font-semibold mb-4">Time Trend</h2>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data.timeTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#5661ff"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    onClick={async () => {
                      await trackEvent("line_chart_click");
                    }}
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
