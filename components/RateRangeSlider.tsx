interface RateRangeSliderProps {
  minRate: number;
  maxRate: number;
  onMinRateChange: (value: number) => void;
  onMaxRateChange: (value: number) => void;
}

const RateRangeSlider = ({ minRate, maxRate, onMinRateChange, onMaxRateChange }: RateRangeSliderProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="min-rate" className="text-sm font-medium">Min Vaccination Rate: {minRate}%</label>
        <input
          id="min-rate"
          type="range"
          min="0"
          max="100"
          value={minRate}
          onChange={(e) => onMinRateChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label htmlFor="max-rate" className="text-sm font-medium">Max Vaccination Rate: {maxRate}%</label>
        <input
          id="max-rate"
          type="range"
          min="0"
          max="100"
          value={maxRate}
          onChange={(e) => onMaxRateChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default RateRangeSlider;
