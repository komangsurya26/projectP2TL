"use client";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Search,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import CustomerDetail from "@/components/CustomerDetail";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function DataAnalysisPage() {
  const params = useParams();
  const typeParam = params.type;

  const isValidType = ["ami", "paskabayar", "prabayar"].includes(
    typeParam?.toLowerCase(),
  );

  const displayType = isValidType
    ? typeParam.toUpperCase().replace("-", " ")
    : "ALL";

  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pelanggan?jenis_meter=${typeParam}&page=${page}&per_page=${perPage}&idpel=${search}&status=${resultFilter}`,
      );

      const json = await response.json();

      setCustomers(json.data || []);
      setMeta(json.meta || {});
      setLoading(false);
    };

    fetchCustomers();
  }, [page, typeParam, perPage, search, resultFilter]);

  useEffect(() => {
    setPage(1);
  }, [typeParam]);

  const filtered = [...customers];
  const paged = filtered;
  const totalPages = meta.last_page || 1;

  const getColumns = () => {
    switch (typeParam?.toLowerCase()) {
      case "ami":
        return [
          { key: "id", label: "ID Pelanggan" },
          { key: "name", label: "Nama Pelanggan" },
          { key: "address", label: "Unit UP" },
          { key: "result", label: "Status" },
        ];

      case "prabayar":
        return [
          { key: "id", label: "ID Pelanggan" },
          { key: "name", label: "Nama Pelanggan" },
          { key: "address", label: "Unit UP" },
          { key: "result", label: "Status" },
        ];
      default:
        return [];
    }
  };

  const columns = getColumns();

  if (!isValidType) {
    return (
      <div className="p-8 text-center text-gray-500">
        Jenis meter tidak valid.
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-blue mb-1">
            Analisis Data: {displayType}
          </h1>
          <p className="text-sm text-gray-500">
            Analisis data inspeksi P2TL dan indikator risiko pelanggan untuk
            meteran {displayType}.
          </p>
        </div>

        <Badge
          variant="primary"
          className="w-fit text-sm px-3 py-1 bg-electric-blue/10 text-electric-blue border-electric-blue/20"
        >
          Total: {meta.total?.toLocaleString() || 0} Pelanggan
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-[1.5px] border-gray-200 rounded-lg w-full md:min-w-[300px] md:w-auto transition-colors focus-within:border-electric-blue focus-within:ring-[3px] focus-within:ring-electric-blue/10">
          <Search size={18} className="text-gray-400 min-w-[18px]" />
          <input
            type="text"
            placeholder="Cari berdasarkan ID atau Nomor Meter..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border-none bg-transparent text-sm text-gray-700 outline-none w-full font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue flex-1 md:flex-none"
            value={resultFilter}
            onChange={(e) => {
              setResultFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Semua Hasil</option>
            <option value="NORMAL">Normal</option>
            <option value="SUSPECT">Suspek</option>
            <option value="ANOMALY">Anomali</option>
            <option value="LOW_CONSUMPTION">Rendah</option>
          </select>
          <select
            className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue min-w-[100px]"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10 baris</option>
            <option value={25}>25 baris</option>
            <option value={50}>50 baris</option>
          </select>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200 cursor-pointer select-none whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">{col.label}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-3.5 text-sm border-b border-gray-100"
                  >
                    <div className="flex items-center justify-center h-10">
                      <div className="animate-spin rounded-full h-6 w-6 border-4 border-t-electric-blue border-b-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : paged.length > 0 ? (
                paged.map((customer, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedCustomer(customer)}
                    className="transition-colors cursor-pointer hover:bg-electric-blue/4"
                  >
                    {columns.map((col) => {
                      if (col.key === "result") {
                        return (
                          <td
                            key={col.key}
                            className="px-4 py-3.5 text-sm border-b border-gray-100"
                          >
                            <Badge
                              variant={
                                customer.result === "ANOMALY"
                                  ? "danger"
                                  : customer.result === "SUSPECT"
                                    ? "warning"
                                    : customer.result === "LOW_CONSUMPTION"
                                      ? "success"
                                      : customer.result === "NORMAL"
                                        ? "primary"
                                        : "default"
                              }
                            >
                              {customer.result.toLowerCase()}
                            </Badge>
                          </td>
                        );
                      }

                      if (col.key === "risk") {
                        return (
                          <td
                            key={col.key}
                            className={`px-4 py-3.5 text-sm border-b border-gray-100`}
                          >
                            {customer.risk_score}
                          </td>
                        );
                      }

                      return (
                        <td
                          key={col.key}
                          className="px-4 py-3.5 text-sm text-gray-700 border-b border-gray-100 whitespace-nowrap"
                        >
                          {customer[col.key] ?? "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-gray-500 border-b border-gray-100"
                  >
                    Tidak ada pelanggan yang cocok dengan kriteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION UI TIDAK DIUBAH */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 bg-white">
          <div className="text-sm text-gray-500">
            Total {meta.total?.toLocaleString() || 0} hasil
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage(1)}
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsLeft size={16} />
            </button>

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const p = start + i;
              if (p > totalPages) return null;

              return (
                <button
                  key={p}
                  className={`w-10 h-10 rounded-md border flex items-center justify-center cursor-pointer transition-colors font-sans text-sm font-medium ${
                    p === page
                      ? "bg-electric-blue border-electric-blue text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-electric-blue hover:text-electric-blue"
                  }`}
                  onClick={() => setPage(p)}
                >
                  <p className="overflow-y-hidden">{p}</p>
                </button>
              );
            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </>
  );
}
