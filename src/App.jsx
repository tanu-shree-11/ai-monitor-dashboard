// ===============================
// AI Monitoring Agent Dashboard
// React 19 – CV Ready Version
// ===============================

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ===============================
// Fake API with Auto Refresh
// ===============================
const generateAgents = () => [
  {
    id: 1,
    name: "Vision AI Agent",
    status: Math.random() > 0.2 ? "Running" : "Stopped",
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
  },
  {
    id: 2,
    name: "NLP Monitoring Agent",
    status: Math.random() > 0.5 ? "Running" : "Stopped",
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
  },
];

// ===============================
// Sidebar
// ===============================
const Sidebar = ({ dark }) => (
  <aside className={`w-64 min-h-screen p-4 ${dark ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}`}>
    <h2 className="text-xl font-bold mb-6">AI Monitor</h2>
    <nav className="space-y-3 font-medium">
      <Link to="/" className="block hover:underline">Dashboard</Link>
      <Link to="/agents" className="block hover:underline">Agents</Link>
      <Link to="/logs" className="block hover:underline">Logs</Link>
      <Link to="/settings" className="block hover:underline">Settings</Link>
    </nav>
  </aside>
);

// ===============================
// Agent Card
// ===============================
const AgentCard = ({ agent, toggleStatus, dark }) => (
  <div className={`p-4 rounded-xl shadow ${dark ? "bg-gray-700 text-white" : "bg-white"}`}>
    <h3 className="font-semibold text-lg">{agent.name}</h3>
    <p>Status: <b>{agent.status}</b></p>
    <p>CPU: {agent.cpu}%</p>
    <p>Memory: {agent.memory}%</p>
    <button
      onClick={() => toggleStatus(agent.id)}
      className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
    >
      {agent.status === "Running" ? "Stop" : "Start"}
    </button>
  </div>
);

// ===============================
// Chart
// ===============================
const AgentChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="cpu" />
      <Line type="monotone" dataKey="memory" />
    </LineChart>
  </ResponsiveContainer>
);

// ===============================
// Pages
// ===============================
const Dashboard = ({ agents }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Dashboard Overview</h1>
    <AgentChart data={agents} />
  </div>
);

const Agents = ({ agents, toggleStatus, dark }) => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Agents</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} toggleStatus={toggleStatus} dark={dark} />
      ))}
    </div>
  </div>
);

const Logs = () => (
  <div>
    <h1 className="text-2xl font-bold mb-2">System Logs</h1>
    <ul className="list-disc ml-6">
      <li>Vision AI Agent heartbeat OK</li>
      <li>NLP Agent memory spike detected</li>
      <li>Auto-restart triggered</li>
    </ul>
  </div>
);

const Settings = () => (
  <div>
    <h1 className="text-2xl font-bold mb-2">Settings</h1>
    <p>Notification preferences and agent thresholds coming soon.</p>
  </div>
);

// ===============================
// MAIN APP
// ===============================
export default function App() {
  const [agents, setAgents] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setAgents(generateAgents());
    const interval = setInterval(() => setAgents(generateAgents()), 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleStatus = (id) => {
    setAgents((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: a.status === "Running" ? "Stopped" : "Running" } : a)
    );
  };

  return (
    <BrowserRouter>
      <div className={`flex min-h-screen ${dark ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
        <Sidebar dark={dark} />
        <main className="flex-1 p-6">
          <button
            onClick={() => setDark(!dark)}
            className="mb-4 px-3 py-1 rounded bg-black text-white"
          >
            Toggle Dark Mode
          </button>

          <Routes>
            <Route path="/" element={<Dashboard agents={agents} />} />
            <Route path="/agents" element={<Agents agents={agents} toggleStatus={toggleStatus} dark={dark} />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
