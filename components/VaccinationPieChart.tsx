import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { VaccinationData } from "@/types/vaccination";

interface VaccinationPieChartProps {
  data: VaccinationData[];
  loading: boolean;
  error: string | null;
}

const COLORS = ["hsl(var(--vac-very-low))", "hsl(var(--vac-medium))", "hsl(var(--vac-very-high))"];

const VaccinationPieChart = ({ data, loading, error }: VaccinationPieChartProps) => {
  if (loading) return <Card className="p-6 border-border"><div className="text-center py-8">Loading pie chart...</div></Card>;
  if (error) return <Card className="p-6 border-border"><div className="text-center py-8 text-red-500">Error: {error}</div></Card>;

  const totalPopulation = data.reduce((sum, state) => sum + state.totalPopulation, 0);
  const totalFirstDoseOnly = data.reduce((sum, state) => sum + state.firstDose - state.secondDose, 0);
  const totalFullyVaccinated = data.reduce((sum, state) => sum + state.secondDose, 0);
  const totalUnvaccinated = totalPopulation - (totalFirstDoseOnly + totalFullyVaccinated);

  const pieData = [
    { name: "Unvaccinated", value: totalUnvaccinated, percent: (totalUnvaccinated / totalPopulation * 100).toFixed(1) },
    { name: "First Dose Only", value: totalFirstDoseOnly, percent: (totalFirstDoseOnly / totalPopulation * 100).toFixed(1) },
    { name: "Fully Vaccinated", value: totalFullyVaccinated, percent: (totalFullyVaccinated / totalPopulation * 100).toFixed(1) },
  ];

  return (
    <Card className="p-6 border-border">
      <h2 className="text-xl font-bold mb-4 text-foreground">Vaccination Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${percent}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              color: "hsl(var(--card-foreground))"
            }}
            formatter={(value: number, name: string) => [
              `${(value / 10000000).toFixed(1)} Cr (${pieData.find(d => d.name === name)?.percent}%)`,
              name
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VaccinationPieChart;
