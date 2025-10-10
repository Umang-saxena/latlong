interface RateRangeSliderProps {
  minRate: number;
  maxRate: number;
  onMinRateChange: (value: number) => void;
  onMaxRateChange: (value: number) => void;
}

const RateRangeSlider = ({ minRate, maxRate, onMinRateChange, onMaxRateChange }: RateRangeSliderProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
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
      <div className="flex-1">
        <label htmlFor="max-rate" className="text-sm font-medium">Max Vaccination Rate: {maxRate}%</label>
        <input
          id="max-rate"
          type="range"
          min="0"
          max="100"
          value={maxRate}
          onChange={(e) => onMaxRateChange(Number(e.target.value))}
          className="w-full"

export default RateRangeSlider;
