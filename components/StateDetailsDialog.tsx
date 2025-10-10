import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { VaccinationData } from "@/types/vaccination";

interface StateDetailsDialogProps {
  state: VaccinationData | null;
  isOpen: boolean;
  onClose: () => void;
}

const StateDetailsDialog = ({ state, isOpen, onClose }: StateDetailsDialogProps) => {
  if (!isOpen || !state) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-foreground">{state.state} Details</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <p><strong>Total Population:</strong> {state.totalPopulation.toLocaleString()}</p>
          <p><strong>First Dose:</strong> {state.firstDose.toLocaleString()}</p>
          <p><strong>Second Dose:</strong> {state.secondDose.toLocaleString()}</p>
          <p><strong>Fully Vaccinated %:</strong> {state.fullyVaccinatedPercent.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default StateDetailsDialog;
