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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-blue mb-1">Upload Data</h1>
        <p className="text-sm text-gray-500">
          Upload Excel files for P2TL inspection data analysis
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
        <div className="p-6">
          <div
            className={`border-2 border-dashed rounded-2xl py-16 px-8 text-center cursor-pointer transition-all
              ${dragover ? "border-electric-blue bg-electric-blue/4" : "border-gray-300 bg-gray-50 hover:border-electric-blue hover:bg-electric-blue/4"}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragover(true);
            }}
            onDragLeave={() => setDragover(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <div className="w-[72px] h-[72px] rounded-2xl bg-electric-blue/10 flex items-center justify-center mx-auto mb-5 text-electric-blue">
              <Upload size={32} />
            </div>
            <h3 className="text-lg font-semibold text-dark-blue mb-2">
              Drag & drop your Excel file here
            </h3>
            <p className="text-sm text-gray-500">
              or{" "}
              <span className="text-electric-blue font-semibold cursor-pointer">
                browse files
              </span>{" "}
              from your computer
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Supports .xlsx, .xls, .csv (max 50MB)
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* File status */}
          {uploadedFile && (
            <div
              className={`flex items-center gap-3 p-4 rounded-lg mt-4
              ${uploadStatus === "success" ? "bg-success/8 border border-success/20 text-success" : "bg-danger/8 border border-danger/20 text-danger"}`}
            >
              {uploadStatus === "success" ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <div>
                <strong>{uploadedFile.name}</strong>
                <span className="ml-2 text-xs">
                  ({(uploadedFile.size / 1024).toFixed(1)} KB)
                </span>
                <div className="text-xs mt-1">
                  {uploadStatus === "success"
                    ? "File validated successfully. Ready to process."
                    : "Invalid file format. Please upload an Excel file."}
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              disabled={uploadStatus !== "success"}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-sans cursor-pointer border-none transition-all bg-linear-to-br from-electric-blue to-[#1976D2] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-electric-blue/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <Upload size={16} /> Upload & Process
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-sans cursor-pointer transition-all bg-white text-gray-700 border-[1.5px] border-gray-200 hover:border-gray-300 hover:bg-gray-50">
              <Download size={16} /> Download Template
            </button>
          </div>
        </div>
      </div>

      {/* Upload History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-dark-blue">
            Upload History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  File Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Upload Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Rows Processed
                </th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((item, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    <span className="flex items-center gap-2">
                      <FileSpreadsheet size={16} className="text-success" />
                      {item.filename}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    {item.date}
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-gray-100">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold
                      ${item.status === "success" ? "bg-success/10 text-success" : item.status === "error" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"}`}
                    >
                      {item.status === "success"
                        ? "✓ Success"
                        : item.status === "error"
                          ? "✕ Failed"
                          : "⟳ Processing"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    {item.rows > 0 ? item.rows.toLocaleString() : "—"}
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
