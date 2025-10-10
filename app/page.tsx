"use client";
import { useState, useEffect, useMemo } from "react";
import { Activity } from "lucide-react";
import VaccinationStats from "@/components/VaccinationStats";
import IndiaMap from "@/components/IndiaMap";
import VaccinationChart from "@/components/VaccinationChart";
import VaccinationPieChart from "@/components/VaccinationPieChart";
import VaccinationTable from "@/components/VaccinationTable";
import RegionSelect from "@/components/RegionSelect";
import RateRangeSlider from "@/components/RateRangeSlider";
import StateDetailsDialog from "@/components/StateDetailsDialog";
import ColorLegend from "@/components/ColorLegend";
import { VaccinationData } from "@/types/vaccination";
import { regionMap } from "@/data/regions";

export default function Home() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<VaccinationData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(100);
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

  const filteredData = useMemo(() => {
    return data.filter(state => {
      const regionMatch = selectedRegion === "All" || regionMap[state.state] === selectedRegion;
      const rateMatch = state.fullyVaccinatedPercent >= minRate && state.fullyVaccinatedPercent <= maxRate;
      return regionMatch && rateMatch;
    });
  }, [data, selectedRegion, minRate, maxRate]);

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
        <VaccinationStats data={filteredData} loading={loading} error={error} />

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <RegionSelect selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
            <RateRangeSlider
              minRate={minRate}
              maxRate={maxRate}
              onMinRateChange={setMinRate}
              onMaxRateChange={setMaxRate}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <IndiaMap
            data={filteredData}
            loading={loading}
            error={error}
            onStateHover={setHoveredState}
            onStateClick={(stateName) => setSelectedState(filteredData.find(d => d.state === stateName) || null)}
          />
          <div className="space-y-6">
            <VaccinationChart data={filteredData} loading={loading} error={error} hoveredState={hoveredState} />
            <VaccinationPieChart data={data} loading={loading} error={error} />
          </div>
        </div>

        <ColorLegend />
        <VaccinationTable data={filteredData} loading={loading} error={error} />

      </main>

      <StateDetailsDialog
        state={selectedState}
        isOpen={!!selectedState}
        onClose={() => setSelectedState(null)}
      />

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Data represents state-wise vaccination coverage across India</p>
        </div>
      </footer>
    </div>
  );
};  

