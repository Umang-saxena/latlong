"use client";
import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import VaccinationStats from "@/components/VaccinationStats";
import IndiaMap from "@/components/IndiaMap";
import VaccinationChart from "@/components/VaccinationChart";
import ColorLegend from "@/components/ColorLegend";
import { VaccinationData } from "@/types/vaccination";

export default function Home() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [data, setData] = useState<VaccinationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vaccination")
      .then((res) => res.json())
      .then((rawData) => {
        const mappedData: VaccinationData[] = rawData.map((item: any) => {
          const fullyVaccinatedPercent =
            (item.totally_vaccinated / item.total) * 100;

          return {
            state: item.title,
            stateCode: item.id, // or use short code if available
            totalPopulation: item.total,
            firstDose: item.partial_vaccinated,
            secondDose: item.totally_vaccinated,
            fullyVaccinatedPercent,
          };
        });

        setData(mappedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">India Vaccination Dashboard</h1>
              <p className="text-sm text-muted-foreground">State-wise COVID-19 vaccination coverage analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <VaccinationStats data={data} loading={loading} error={error} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IndiaMap data={data} loading={loading} error={error} onStateHover={setHoveredState} />
          <div className="space-y-6">
            <VaccinationChart data={data} loading={loading} error={error} hoveredState={hoveredState} />
          </div>
        </div>

        <ColorLegend />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Data represents state-wise vaccination coverage across India</p>
        </div>
      </footer>
    </div>
  );
};  

