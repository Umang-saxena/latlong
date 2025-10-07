import { vaccinationData } from "@/data/vaccinationData";
import { Card } from "@/components/ui/card";
import { Users, Syringe, CheckCircle2, TrendingUp } from "lucide-react";

const VaccinationStats = () => {
  const totalPopulation = vaccinationData.reduce((sum, state) => sum + state.totalPopulation, 0);
  const totalFirstDose = vaccinationData.reduce((sum, state) => sum + state.firstDose, 0);
  const totalSecondDose = vaccinationData.reduce((sum, state) => sum + state.secondDose, 0);
  const avgVaccinationRate = (vaccinationData.reduce((sum, state) => sum + state.fullyVaccinatedPercent, 0) / vaccinationData.length).toFixed(1);

  const stats = [
    {
      icon: Users,
      label: "Total Population",
      value: (totalPopulation / 10000000).toFixed(1) + " Cr",
      color: "text-primary"
    },
    {
      icon: Syringe,
      label: "First Dose",
      value: (totalFirstDose / 10000000).toFixed(1) + " Cr",
      color: "text-accent"
    },
    {
      icon: CheckCircle2,
      label: "Fully Vaccinated",
      value: (totalSecondDose / 10000000).toFixed(1) + " Cr",
      color: "text-[hsl(var(--vac-very-high))]"
    },
    {
      icon: TrendingUp,
      label: "Average Coverage",
      value: avgVaccinationRate + "%",
      color: "text-[hsl(var(--vac-high))]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-border">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-secondary/50 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VaccinationStats;
