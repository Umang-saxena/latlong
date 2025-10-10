import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Search, Loader } from "lucide-react";
import { VaccinationData } from "@/types/vaccination";

interface VaccinationTableProps {
  data: VaccinationData[];
  loading: boolean;
  error: string | null;
}

const VaccinationTable = ({ data, loading, error }: VaccinationTableProps) => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof VaccinationData>("state");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(state =>
      state.state.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return filtered;
  }, [data, search, sortKey, sortOrder]);

  const handleSort = (key: keyof VaccinationData) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading) return <Card className="p-6 border-border"><div className="flex justify-center items-center py-8"><Loader className="w-8 h-8 animate-spin text-primary" /></div></Card>;
  if (error) return <Card className="p-6 border-border"><div className="text-center py-8 text-red-500">Error: {error}</div></Card>;

  return (
    <Card className="p-6 border-border">
      <h2 className="text-xl font-bold mb-4 text-foreground">Vaccination Data Table</h2>
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search states..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="max-h-96 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10">
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("state")}>
                  State <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("totalPopulation")}>
                  Population <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("firstDose")}>
                  First Dose <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("secondDose")}>
                  Second Dose <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("fullyVaccinatedPercent")}>
                  Coverage % <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((state) => (
              <TableRow key={state.state}>
                <TableCell className="font-medium">{state.state}</TableCell>
                <TableCell>{state.totalPopulation.toLocaleString()}</TableCell>
                <TableCell>{state.firstDose.toLocaleString()}</TableCell>
                <TableCell>{state.secondDose.toLocaleString()}</TableCell>
                <TableCell>{state.fullyVaccinatedPercent.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default VaccinationTable;
