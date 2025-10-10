import { Button } from "@/components/ui/button";

interface RegionSelectProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = ["All", "North", "South", "East", "West", "Central", "Northeast"];

const RegionSelect = ({ selectedRegion, onRegionChange }: RegionSelectProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {regions.map((region) => (
        <Button
          key={region}
          variant={selectedRegion === region ? "default" : "outline"}
          size="sm"
          onClick={() => onRegionChange(region)}
        >
          {region}
        </Button>
      ))}
    </div>
  );
};

export default RegionSelect;
