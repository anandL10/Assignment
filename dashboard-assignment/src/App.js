import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import './App.css';
import { FaSearch, FaUserCircle, FaHome, FaChartBar, FaCog, FaPlus } from 'react-icons/fa';

const COLORS = ['#f87171', '#facc15', '#60a5fa', '#4ade80'];

const initialData = [
  {
    category: "CSPM Executive Dashboard",
    widgets: [
      {
        id: uuidv4(),
        type: 'pie',
        name: "Cloud Accounts",
        timestamp: Date.now(),
        data: [
          { name: 'Connected', value: 2 },
          { name: 'Not Connected', value: 2 },
          { name: 'Partial', value: 4 }
        ]
      },
      {
        id: uuidv4(),
        type: 'stat',
        name: "IAM Policies",
        timestamp: Date.now(),
        value: 104,
        description: "Total IAM Policies"
      },
      {
        id: uuidv4(),
        type: 'bar',
        name: "Compliance Issues",
        timestamp: Date.now(),
        data: [
          { name: 'PCI', value: 7 },
          { name: 'HIPAA', value: 5 },
          { name: 'ISO', value: 3 }
        ]
      },
      {
        id: uuidv4(),
        type: 'line',
        name: "Cloud Usage Over Time",
        timestamp: Date.now(),
        data: [
          { name: 'Week 1', value: 20 },
          { name: 'Week 2', value: 25 },
          { name: 'Week 3', value: 30 }
        ]
      }
    ]
  },
  {
    category: "CWPP Dashboard",
    widgets: [
      {
        id: uuidv4(),
        type: 'bar',
        name: "Top 5 Namespace Alerts",
        timestamp: Date.now(),
        data: [
          { name: 'A', value: 5 },
          { name: 'B', value: 3 },
          { name: 'C', value: 4 }
        ]
      },
      {
        id: uuidv4(),
        type: 'empty',
        name: "CWPP Vulnerabilities",
        timestamp: Date.now(),
        message: "No Graph data available"
      },
      {
        id: uuidv4(),
        type: 'pie',
        name: "Agent Status",
        timestamp: Date.now(),
        data: [
          { name: 'Running', value: 3 },
          { name: 'Stopped', value: 1 },
          { name: 'Idle', value: 2 }
        ]
      },
      {
        id: uuidv4(),
        type: 'stat',
        name: "Total Containers",
        timestamp: Date.now(),
        value: 78,
        description: "Total running containers in CWPP"
      }
    ]
  },
  {
    category: "Risk Dashboard",
    widgets: [
      {
        id: uuidv4(),
        type: 'riskbar',
        name: "Risk Severity Overview",
        timestamp: Date.now(),
        data: [
          { name: 'Critical', value: 8 },
          { name: 'High', value: 15 },
          { name: 'Medium', value: 30 },
          { name: 'Low', value: 50 }
        ]
      },
      {
        id: uuidv4(),
        type: 'line',
        name: "Risk Trends",
        timestamp: Date.now(),
        data: [
          { name: 'Jan', value: 10 },
          { name: 'Feb', value: 20 },
          { name: 'Mar', value: 15 }
        ]
      },
      {
        id: uuidv4(),
        type: 'bar',
        name: "Risk Count by Region",
        timestamp: Date.now(),
        data: [
          { name: 'US-East', value: 12 },
          { name: 'EU-West', value: 9 },
          { name: 'AP-South', value: 14 }
        ]
      },
      {
        id: uuidv4(),
        type: 'stat',
        name: "Total Risks",
        timestamp: Date.now(),
        value: 102,
        description: "Combined risk items"
      }
    ]
  }
];

function Widget({ widget, onRemove }) {
  return (
    <div className="widget">
      <div className="widget-header">
        <h4>{widget.name}</h4>
        <span className="timestamp">{new Date(widget.timestamp).toLocaleString()}</span>
        <button onClick={onRemove}>
          <img src="/images/cross-svgrepo-com.png" alt="Remove" width={24} height={24} />
        </button>
      </div>
      {widget.type === 'pie' && (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={widget.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {widget.data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
      {widget.type === 'bar' && (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={widget.data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
      {widget.type === 'line' && (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={widget.data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
      {widget.type === 'riskbar' && (
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            layout="vertical"
            data={[{
              name: "Risk",
              ...Object.fromEntries(widget.data.map(d => [d.name, d.value]))
            }]}
            stackOffset="expand"
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip />
            {widget.data.map((entry, index) => (
              <Bar
                key={entry.name}
                dataKey={entry.name}
                stackId="1"
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
      {widget.type === 'stat' && (
        <div className="stat-widget">
          <p className="stat-value">{widget.value}</p>
          <span className="stat-desc">{widget.description}</span>
        </div>
      )}
      {widget.type === 'empty' && (
        <div className="empty-widget">
          <p>{widget.message}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');

  const [widgetForm, setWidgetForm] = useState({
    type: 'pie',
    name: '',
    data: [{ label: '', value: '' }],
    value: '',
    description: '',
    message: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem("dashboardData");
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      setCategories(initialData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardData", JSON.stringify(categories));
  }, [categories]);

  const addWidget = () => {
    const widget = {
      id: uuidv4(),
      type: widgetForm.type,
      name: widgetForm.name || `New ${widgetForm.type} Widget`,
      timestamp: Date.now(),
    };

    if (["pie", "bar", "line", "riskbar"].includes(widgetForm.type)) {
      widget.data = widgetForm.data.map(d => ({ name: d.label, value: parseFloat(d.value) }));
    }

    if (widgetForm.type === 'stat') {
      widget.value = widgetForm.value || 0;
      widget.description = widgetForm.description || "No description provided.";
    }

    if (widgetForm.type === 'empty') {
      widget.message = widgetForm.message || "No data available.";
    }

    const updated = [...categories];
    updated[activeCategoryIndex].widgets.push(widget);
    setCategories(updated);
    setShowModal(false);
    setWidgetForm({ type: 'pie', name: '', data: [{ label: '', value: '' }], value: '', description: '', message: '' });
  };

  const filterByTime = (timestamp, filter) => {
    const now = Date.now();
    if (filter === '24hrs') return now - timestamp <= 24 * 60 * 60 * 1000;
    if (filter === '7days') return now - timestamp <= 7 * 24 * 60 * 60 * 1000;
    if (filter === '30days') return now - timestamp <= 30 * 24 * 60 * 60 * 1000;
    return true;
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    widgets: cat.widgets.filter(widget =>
      filterByTime(widget.timestamp, timeFilter) && widget.name.toLowerCase().includes(search.toLowerCase())
    )
  }));

  const removeWidget = (catIndex, widgetId) => {
    const updated = [...categories];
    updated[catIndex].widgets = updated[catIndex].widgets.filter(w => w.id !== widgetId);
    setCategories(updated);
  };

  return (
    <div className="App layout">
      <nav className="sidebar">
        <h3>My Dashboard</h3>
        <ul>
          <li><FaHome /> Home</li>
          <li><FaChartBar /> Reports</li>
          <li><FaCog /> Settings</li>
        </ul>
      </nav>
      <main className="main-content">
        <header className="app-header">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search widgets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="profile-container">
            <FaUserCircle className="profile-icon" />
          </div>
        </header>
        <h1>Dashboard</h1>

        <div className="time-filter">
          <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
            <option value="all">All Time</option>
            <option value="24hrs">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>

        {filteredCategories.map((cat, i) => (
          <div key={i} className="category">
            <h2>{cat.category}</h2>
            <div className="widget-grid">
              {cat.widgets.map(widget => (
                <Widget
                  key={widget.id}
                  widget={widget}
                  onRemove={() => removeWidget(i, widget.id)}
                />
              ))}
              <div className="widget add-widget-card" onClick={() => { setActiveCategoryIndex(i); setShowModal(true); }}>
                <div className="add-widget-inner">
                  <FaPlus size={28} />
                  <p>Add Widget</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Widget</h3>
              <label>Type:</label>
              <select value={widgetForm.type} onChange={e => setWidgetForm({ ...widgetForm, type: e.target.value })}>
                <option value="pie">Pie</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="riskbar">Risk Bar</option>
                <option value="stat">Stat</option>
                <option value="empty">Empty</option>
              </select>

              <label>Name:</label>
              <input value={widgetForm.name} onChange={e => setWidgetForm({ ...widgetForm, name: e.target.value })} />

              {["pie", "bar", "line", "riskbar"].includes(widgetForm.type) && widgetForm.data.map((entry, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    placeholder="Label"
                    value={entry.label}
                    onChange={e => {
                      const newData = [...widgetForm.data];
                      newData[index].label = e.target.value;
                      setWidgetForm({ ...widgetForm, data: newData });
                    }}
                  />
                  <input
                    placeholder="Value"
                    type="number"
                    value={entry.value}
                    onChange={e => {
                      const newData = [...widgetForm.data];
                      newData[index].value = e.target.value;
                      setWidgetForm({ ...widgetForm, data: newData });
                    }}
                  />
                </div>
              ))}
              {["pie", "bar", "line", "riskbar"].includes(widgetForm.type) && (
                <button onClick={() => setWidgetForm({ ...widgetForm, data: [...widgetForm.data, { label: '', value: '' }] })}>+ Add Row</button>
              )}

              {widgetForm.type === 'stat' && (
                <>
                  <label>Value:</label>
                  <input type="number" value={widgetForm.value} onChange={e => setWidgetForm({ ...widgetForm, value: e.target.value })} />
                  <label>Description:</label>
                  <input value={widgetForm.description} onChange={e => setWidgetForm({ ...widgetForm, description: e.target.value })} />
                </>
              )}

              {widgetForm.type === 'empty' && (
                <>
                  <label>Message:</label>
                  <input value={widgetForm.message} onChange={e => setWidgetForm({ ...widgetForm, message: e.target.value })} />
                </>
              )}

              <div className="modal-buttons">
                <button onClick={addWidget}>Add</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
