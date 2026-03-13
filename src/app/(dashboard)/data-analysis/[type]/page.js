import DataAnalysisClient from "./components/DataAnalysisClient";

export function generateStaticParams() {
  return [{ type: "ami" }, { type: "prabayar" }];
}

export default function Page({ params }) {
  return <DataAnalysisClient />;
}
