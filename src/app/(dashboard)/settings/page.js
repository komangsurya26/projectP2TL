"use client";
import { User, Bell, Shield, Database, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and application preferences</p>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {/* Profile */}
        <div className="card">
          <div className="card-header">
            <h3>
              <User
                size={18}
                style={{
                  display: "inline",
                  marginRight: "0.5rem",
                  verticalAlign: "middle",
                }}
              />
              Profile Settings
            </h3>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
                maxWidth: "600px",
              }}
            >
              <div className="form-group">
                <label>Full Name</label>
                <input className="form-input" defaultValue="Admin Staff" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input className="form-input" defaultValue="admin@pln.co.id" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  className="form-input"
                  defaultValue="Senior Analyst"
                  readOnly
                  style={{ background: "var(--color-gray-50)" }}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input className="form-input" defaultValue="P2TL Division" />
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <div className="card-header">
            <h3>
              <Bell
                size={18}
                style={{
                  display: "inline",
                  marginRight: "0.5rem",
                  verticalAlign: "middle",
                }}
              />
              Notification Preferences
            </h3>
          </div>
          <div className="card-body">
            {[
              "Anomaly Detection Alerts",
              "Inspection Report Ready",
              "Weekly Summary Email",
              "System Maintenance Notices",
            ].map((label, i) => (
              <label
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 0",
                  borderBottom:
                    i < 3 ? "1px solid var(--color-gray-100)" : "none",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked={i < 2}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "var(--color-electric-blue)",
                  }}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* System */}
        <div className="card">
          <div className="card-header">
            <h3>
              <Database
                size={18}
                style={{
                  display: "inline",
                  marginRight: "0.5rem",
                  verticalAlign: "middle",
                }}
              />
              System Information
            </h3>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "0.75rem 2rem",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ color: "var(--color-gray-500)", fontWeight: 600 }}>
                Version
              </span>
              <span>P2TL Analytics v1.0.0</span>
              <span style={{ color: "var(--color-gray-500)", fontWeight: 600 }}>
                Last Updated
              </span>
              <span>March 2026</span>
              <span style={{ color: "var(--color-gray-500)", fontWeight: 600 }}>
                Database
              </span>
              <span>PostgreSQL 16.2</span>
              <span style={{ color: "var(--color-gray-500)", fontWeight: 600 }}>
                Environment
              </span>
              <span style={{ color: "var(--color-success)", fontWeight: 600 }}>
                Production
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
