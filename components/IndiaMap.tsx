import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { VaccinationData } from "@/types/vaccination";
import { indiaStates } from "../data/indiaStates";

const getVaccinationColor = (percent: number): string => {
    if (percent < 35) return "hsl(var(--vac-very-low))";
    if (percent < 40) return "hsl(var(--vac-low))";
    if (percent < 45) return "hsl(var(--vac-medium))";
    if (percent < 50) return "hsl(var(--vac-high))";
    return "hsl(var(--vac-very-high))";
};

interface IndiaMapProps {
    data: VaccinationData[];
    loading: boolean;
    error: string | null;
    onStateHover: (state: string | null) => void;
    onStateClick?: (state: string) => void;
}

const IndiaMap = ({ data, loading, error, onStateHover, onStateClick }: IndiaMapProps) => {
    const [tooltip, setTooltip] = useState<{ state: string; percent: number; x: number; y: number } | null>(null);

    const handleMouseEnter = (state: string, event: React.MouseEvent<SVGPathElement>) => {
        const stateData = data.find(d => d.state === state);
        if (stateData) {
            const rect = event.currentTarget.getBoundingClientRect();
            setTooltip({
                state: stateData.state,
                percent: stateData.fullyVaccinatedPercent,
                x: event.clientX,
                y: event.clientY
            });
            onStateHover(state);
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
        onStateHover(null);
    };

    const handleStateClick = (state: string) => {
        if (onStateClick) {
            onStateClick(state);
        }
    };

    const getStateFill = (stateName: string) => {
        const stateData = data.find(d => d.state === stateName);
        return stateData ? getVaccinationColor(stateData.fullyVaccinatedPercent) : "hsl(var(--muted))";
    };

    if (loading) return <Card className="p-6 border-border"><div className="flex justify-center items-center py-8"><Loader className="w-8 h-8 animate-spin text-primary" /></div></Card>;
    if (error) return <Card className="p-6 border-border"><div className="text-center py-8 text-red-500">Error: {error}</div></Card>;

    const stateData = indiaStates;

    return (
        <Card className="p-6 border-border relative">
            <h2 className="text-xl font-bold mb-4 text-foreground">India Vaccination Map</h2>
            <div className="relative">
                <svg viewBox="0 0 500 400" className="w-full h-auto">
                    <g>
                        {stateData.map((state) => (
                            <path
                                key={state.name}
                                d={state.d}
                                fill={getStateFill(state.name)}
                                stroke="hsl(var(--background))"
                                strokeWidth="2"
                                className="cursor-pointer transition-all duration-300 hover:opacity-80 hover:stroke-primary hover:stroke-[3px]"
                                onMouseEnter={(e) => handleMouseEnter(state.name, e)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleStateClick(state.name)}
                            />
                        ))}
                    </g>
                </svg>

                {tooltip && (
                    <div
                        className="fixed z-50 px-3 py-2 text-sm bg-card border border-border rounded-lg shadow-lg pointer-events-none"
                        style={{
                            left: tooltip.x + 10,
                            top: tooltip.y - 40,
                        }}
                    >
                        <div className="font-semibold text-foreground">{tooltip.state}</div>
                        <div className="text-muted-foreground">Coverage: {tooltip.percent.toFixed(1)}%</div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default IndiaMap;
