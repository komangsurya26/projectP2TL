"use client";
import { useState } from "react";
import { X, MapPin, Phone, Zap, AlertTriangle } from "lucide-react";
import { UsageTrendChart, YearlyTrendChart } from "./Charts";
import { measurementHistory, dataChangeHistory } from "@/data/mockData";

export default function CustomerDetail({ customer, onClose }) {
  const [activeTab, setActiveTab] = useState("usage");
  if (!customer) return null;

  const riskColors = {
    high: "var(--color-danger)",
    medium: "var(--color-warning)",
    low: "var(--color-success)",
  };

  return (
    <>
      <div className="detail-overlay" onClick={onClose} />
      <div className="detail-panel">
        <div className="detail-header">
          <div className="detail-header-info">
            <h2>{customer.name}</h2>
            <p>
              ID: {customer.id} • {customer.tariff} • {customer.power}
            </p>
          </div>
          <button className="detail-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="detail-body">
          {/* Customer Info */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8125rem",
                color: "var(--color-gray-600)",
              }}
            >
              <MapPin size={14} /> {customer.address}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8125rem",
                color: "var(--color-gray-600)",
              }}
            >
              <Phone size={14} /> {customer.phone}
            </div>
          </div>

          {/* Stats */}
          <div className="detail-stats">
            <div className="detail-stat">
              <div className="detail-stat-value">{customer.power}</div>
              <div className="detail-stat-label">Power Capacity</div>
            </div>
            <div className="detail-stat">
              <div
                className="detail-stat-value"
                style={{ color: riskColors[customer.risk] }}
              >
                {customer.risk.charAt(0).toUpperCase() + customer.risk.slice(1)}
              </div>
              <div className="detail-stat-label">Risk Level</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-value">{customer.result}</div>
              <div className="detail-stat-label">Inspection Result</div>
            </div>
          </div>

          {/* Anomaly alert */}
          {customer.risk === "high" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem",
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                fontSize: "0.8125rem",
                color: "var(--color-danger)",
              }}
            >
              <AlertTriangle size={18} />
              <span>
                <strong>Anomaly Detected:</strong> Significant usage drop
                detected in months 4-6. Possible meter tampering or bypass
                suspected.
              </span>
            </div>
          )}

          {/* Tabs */}
          <div className="detail-tabs">
            {["usage", "yearly", "measurements", "changes"].map((tab) => (
              <button
                key={tab}
                className={`detail-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {
                  {
                    usage: "Monthly Usage",
                    yearly: "Yearly Trend",
                    measurements: "Measurements",
                    changes: "Data Changes",
                  }[tab]
                }
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "usage" && (
            <div>
              <h4
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-dark-blue)",
                  marginBottom: "1rem",
                }}
              >
                Monthly Energy Usage (kWh)
              </h4>
              <UsageTrendChart monthlyUsage={customer.monthlyUsage} />
            </div>
          )}

          {activeTab === "yearly" && (
            <div>
              <h4
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-dark-blue)",
                  marginBottom: "1rem",
                }}
              >
                Yearly Consumption Trend (kWh)
              </h4>
              <YearlyTrendChart yearlyUsage={customer.yearlyUsage} />
            </div>
          )}

          {activeTab === "measurements" && (
            <div style={{ overflowX: "auto" }}>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>kWh</th>
                    <th>kVARh</th>
                    <th>PF</th>
                    <th>Voltage</th>
                    <th>Current</th>
                  </tr>
                </thead>
                <tbody>
                  {measurementHistory.map((m, i) => (
                    <tr key={i}>
                      <td>{m.date}</td>
                      <td>{m.kwh}</td>
                      <td>{m.kvarh}</td>
                      <td>{m.pf}</td>
                      <td>{m.voltage}V</td>
                      <td>{m.current}A</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "changes" && (
            <div style={{ overflowX: "auto" }}>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Field</th>
                    <th>Old Value</th>
                    <th>New Value</th>
                    <th>Changed By</th>
                  </tr>
                </thead>
                <tbody>
                  {dataChangeHistory.map((c, i) => (
                    <tr key={i}>
                      <td>{c.date}</td>
                      <td>{c.field}</td>
                      <td style={{ color: "var(--color-danger)" }}>
                        {c.oldValue}
                      </td>
                      <td style={{ color: "var(--color-success)" }}>
                        {c.newValue}
                      </td>
                      <td>{c.changedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
