"use client";
import { useState } from "react";
import { Download, FileSpreadsheet, Calendar } from "lucide-react";

const downloadHistory = [
  {
    name: "P2TL_Report_Feb_2026.xlsx",
    date: "2026-02-28",
    size: "2.4 MB",
    type: "Monthly Report",
  },
  {
    name: "P2TL_Report_Jan_2026.xlsx",
    date: "2026-01-31",
    size: "2.1 MB",
    type: "Monthly Report",
  },
  {
    name: "Anomaly_Q4_2025.xlsx",
    date: "2025-12-31",
    size: "1.8 MB",
    type: "Anomaly Report",
  },
  {
    name: "P2TL_Annual_2025.xlsx",
    date: "2025-12-31",
    size: "8.5 MB",
    type: "Annual Report",
  },
  {
    name: "Risk_Assessment_Dec_2025.xlsx",
    date: "2025-12-15",
    size: "3.2 MB",
    type: "Risk Report",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [2026, 2025, 2024, 2023];
const reportTypes = [
  "Monthly Report",
  "Anomaly Report",
  "Risk Report",
  "Annual Report",
  "Customer Summary",
];

export default function DownloadPage() {
  const [month, setMonth] = useState("February");
  const [year, setYear] = useState(2026);
  const [type, setType] = useState("Monthly Report");

  const handleDownload = () => {
    alert(
      `Downloading ${type} for ${month} ${year}...\n\n(Demo: In production, this would generate and download an XLSX file)`,
    );
  };

  return (
    <>
      <div className="page-header">
        <h1>Download Reports</h1>
        <p>Download processed analysis results and inspection reports</p>
      </div>

      <div className="card" style={{ marginBottom: "2rem" }}>
        <div className="card-header">
          <h3>Generate Report</h3>
        </div>
        <div className="card-body">
          <div className="download-filters">
            <div className="download-filter-group">
              <label>Report Type</label>
              <select
                className="filter-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {reportTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="download-filter-group">
              <label>Month</label>
              <select
                className="filter-select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="download-filter-group">
              <label>Year</label>
              <select
                className="filter-select"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleDownload}>
              <Download size={16} /> Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Recent Downloads</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="history-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {downloadHistory.map((item, i) => (
                <tr key={i}>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FileSpreadsheet
                      size={16}
                      style={{ color: "var(--color-success)" }}
                    />{" "}
                    {item.name}
                  </td>
                  <td>{item.type}</td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Calendar
                      size={14}
                      style={{ color: "var(--color-gray-400)" }}
                    />{" "}
                    {item.date}
                  </td>
                  <td>{item.size}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: "6px 14px" }}
                    >
                      <Download size={14} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
