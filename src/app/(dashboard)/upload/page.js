"use client";
import { useState, useRef } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import { uploadHistory } from "@/data/mockData";

export default function UploadPage() {
  const [dragover, setDragover] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragover(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    const isExcel =
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".csv");
    setUploadedFile(file);
    setUploadStatus(isExcel ? "success" : "error");
  };

  return (
    <>
      <div className="page-header">
        <h1>Upload Data</h1>
        <p>Upload Excel files for P2TL inspection data analysis</p>
      </div>

      <div className="card" style={{ marginBottom: "2rem" }}>
        <div className="card-body">
          <div
            className={`upload-zone${dragover ? " dragover" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragover(true);
            }}
            onDragLeave={() => setDragover(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <div className="upload-zone-icon">
              <Upload size={32} />
            </div>
            <h3>Drag & drop your Excel file here</h3>
            <p>
              or <span className="browse-link">browse files</span> from your
              computer
            </p>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--color-gray-400)",
              }}
            >
              Supports .xlsx, .xls, .csv (max 50MB)
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </div>

          {uploadedFile && (
            <div className={`file-status ${uploadStatus}`}>
              {uploadStatus === "success" ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <div>
                <strong>{uploadedFile.name}</strong>
                <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem" }}>
                  ({(uploadedFile.size / 1024).toFixed(1)} KB)
                </span>
                <div style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  {uploadStatus === "success"
                    ? "File validated successfully. Ready to process."
                    : "Invalid file format. Please upload an Excel file."}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              className="btn btn-primary"
              disabled={uploadStatus !== "success"}
            >
              <Upload size={16} /> Upload & Process
            </button>
            <button className="btn btn-secondary">
              <Download size={16} /> Download Template
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Upload History</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="history-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>Rows Processed</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((item, i) => (
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
                    />
                    {item.filename}
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status === "success"
                        ? "✓ Success"
                        : item.status === "error"
                          ? "✕ Failed"
                          : "⟳ Processing"}
                    </span>
                  </td>
                  <td>{item.rows > 0 ? item.rows.toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
