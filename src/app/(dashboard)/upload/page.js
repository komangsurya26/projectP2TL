"use client";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Download,
  Loader2,
} from "lucide-react";

export default function UploadPage() {
  const [dragover, setDragover] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [template, setTemplate] = useState("");
  const fileRef = useRef(null);
  const [uploadHistory, setUploadHistory] = useState([]);

  const fetchUploadHistory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload-history`,
    );
    const json = await res.json();
    setUploadHistory(json.data);
  };

  useEffect(() => {
    fetchUploadHistory();
  }, []);

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
    const isCSV = file.name.endsWith(".csv");
    setUploadedFile(file);
    setUploadStatus(isCSV ? "success" : "error");
  };

  const handleDownloadTemplate = () => {
    if (!template) {
      toast.error("Pilih jenis template yang ingin di-download");
      return;
    }
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/template-${template}`,
      "_blank",
    );
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    if (!template) {
      toast.error("Pilih jenis template yang ingin diupload");
      return;
    }

    setUploadStatus("processing");

    try {
      const chunkSize = 5 * 1024 * 1024; // 5MB per chunk
      const totalChunks = Math.ceil(uploadedFile.size / chunkSize);

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, uploadedFile.size);

        const chunk = uploadedFile.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk, uploadedFile.name);
        formData.append("chunkIndex", i);
        formData.append("totalChunks", totalChunks);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/upload-${template}`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          },
        );

        const data = await res.json();
        if (data.status === "error") {
          toast.error(data.message);
          setUploadStatus("error");
          return;
        }
      }

      toast.success("Upload selesai, file sedang diproses di server");
      setUploadStatus("success");
    } catch (err) {
      toast.error("Upload gagal, ada kesalahan pada server");
      setUploadStatus("error");
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-blue mb-1">Unggah Data</h1>
        <p className="text-sm text-gray-500">
          Unggah file CSV untuk analisis data inspeksi P2TL
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
              Tarik & lepas file CSV Anda di sini
            </h3>
            <p className="text-sm text-gray-500">
              atau{" "}
              <span className="text-electric-blue font-semibold cursor-pointer">
                cari file
              </span>{" "}
              dari komputer Anda
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Mendukung .csv (maks 500MB)
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* File status */}
          {uploadedFile && (
            <div
              className={`flex items-center gap-3 p-4 rounded-lg mt-4
              ${uploadStatus === "success" ? "bg-success/8 border border-success/20 text-success" : uploadStatus === "processing" ? "bg-warning/8 border border-warning/20 text-warning" : "bg-danger/8 border border-danger/20 text-danger"}`}
            >
              {uploadStatus === "success" ? (
                <CheckCircle size={20} />
              ) : uploadStatus === "processing" ? (
                <Loader2 size={20} />
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
                    ? "File berhasil divalidasi. Siap untuk diproses."
                    : uploadStatus === "processing"
                      ? "File sedang diproses"
                      : "Format file tidak valid. Harap unggah file CSV."}
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6 md:flex-row flex-col">
            <button
              onClick={handleUpload}
              disabled={!uploadedFile || uploadStatus === "processing"}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-sans cursor-pointer border-none transition-all bg-linear-to-br from-electric-blue to-[#1976D2] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-electric-blue/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <Upload size={16} />
              {uploadStatus === "processing"
                ? "Sedang memproses..."
                : "Unggah & Proses"}
            </button>
            <div>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric-blue"
              >
                <option value="">Pilih Jenis Template</option>
                <option value="ami">Data AMI</option>
                <option value="dil">Data DIL</option>
                <option value="amr">Data AMR</option>
                <option value="epm">Data EPM</option>
              </select>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-sans cursor-pointer transition-all bg-white text-gray-700 border-[1.5px] border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <Download size={16} /> Unduh Template
            </button>
          </div>
        </div>
      </div>

      {/* Upload History */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-dark-blue">
            Riwayat Unggahan
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Nama File
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Tanggal Unggah
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Baris Diproses
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Di Unggah Oleh
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
                        ? "✓ Berhasil"
                        : item.status === "error"
                          ? "✕ Gagal"
                          : "⟳ Sedang memproses"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    {item.rows > 0 ? item.rows.toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    {item.uploaded_by}
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
