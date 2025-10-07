import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { VaccinationData } from "@/types/vaccination";

const getVaccinationColor = (percent: number): string => {
  if (percent < 75) return "hsl(var(--vac-very-low))";
  if (percent < 80) return "hsl(var(--vac-low))";
  if (percent < 85) return "hsl(var(--vac-medium))";
  if (percent < 90) return "hsl(var(--vac-high))";
  return "hsl(var(--vac-very-high))";
};

interface VaccinationChartProps {
    data: VaccinationData[];
    loading: boolean;
    error: string | null;
    hoveredState: string | null;
}

const VaccinationChart = ({ data, loading, error, hoveredState }: VaccinationChartProps) => {

  if (loading) return <Card className="p-6 border-border"><div className="text-center py-8">Loading chart...</div></Card>;
  if (error) return <Card className="p-6 border-border"><div className="text-center py-8 text-red-500">Error: {error}</div></Card>;

    const sortedData = [...data]
        .sort((a, b) => b.fullyVaccinatedPercent - a.fullyVaccinatedPercent)
        .slice(0, 15);

    return (
        <Card className="p-6 border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground">Top 15 States by Vaccination Coverage</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                        dataKey="stateCode"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                        label={{ value: "Coverage (%)", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            color: "hsl(var(--card-foreground))"
                        }}
                        formatter={(value: number, name: string, props: any) => [
                            `${value.toFixed(1)}%`,
                            props.payload.state
                        ]}
                    />
                    <Bar dataKey="fullyVaccinatedPercent" radius={[8, 8, 0, 0]}>
                        {sortedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getVaccinationColor(entry.fullyVaccinatedPercent)}
                                opacity={hoveredState === null || hoveredState === entry.state ? 1 : 0.3}
                                className="transition-opacity duration-300"
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default VaccinationChart;
