import { useState } from "react";
import { Card } from "@/components/ui/card";
import { VaccinationData } from "@/types/vaccination";

const getVaccinationColor = (percent: number): string => {
    if (percent < 75) return "hsl(var(--vac-very-low))";
    if (percent < 80) return "hsl(var(--vac-low))";
    if (percent < 85) return "hsl(var(--vac-medium))";
    if (percent < 90) return "hsl(var(--vac-high))";
    return "hsl(var(--vac-very-high))";
};

interface IndiaMapProps {
    data: VaccinationData[];
    loading: boolean;
    error: string | null;
    onStateHover: (state: string | null) => void;
}

const IndiaMap = ({ data, loading, error, onStateHover }: IndiaMapProps) => {
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

    const getStateFill = (stateName: string) => {
        const stateData = data.find(d => d.state === stateName);
        return stateData ? getVaccinationColor(stateData.fullyVaccinatedPercent) : "hsl(var(--muted))";
    };

    if (loading) return <Card className="p-6 border-border"><div className="text-center py-8">Loading map...</div></Card>;
    if (error) return <Card className="p-6 border-border"><div className="text-center py-8 text-red-500">Error: {error}</div></Card>;

    const stateData = [
        { name: "Jammu and Kashmir", d: "M185 25 L195 20 L205 25 L210 35 L205 45 L195 50 L185 45 L180 35 Z" },
        { name: "Ladakh", d: "M220 15 L235 10 L245 20 L240 35 L225 40 L215 30 Z" },
        { name: "Himachal Pradesh", d: "M210 50 L225 45 L235 55 L230 65 L215 70 L205 60 Z" },
        { name: "Punjab", d: "M195 65 L210 60 L220 70 L215 80 L200 85 L190 75 Z" },
        { name: "Haryana", d: "M215 85 L230 80 L240 90 L235 100 L220 105 L210 95 Z" },
        { name: "Delhi", d: "M228 95 L235 92 L238 98 L235 103 L228 100 Z" },
        { name: "Uttarakhand", d: "M240 65 L255 60 L265 70 L260 80 L245 85 L235 75 Z" },
        { name: "Uttar Pradesh", d: "M235 105 L290 100 L300 120 L295 140 L280 145 L240 150 L230 130 Z" },
        { name: "Rajasthan", d: "M190 90 L220 85 L230 110 L225 145 L200 155 L175 145 L170 120 L180 100 Z" },
        { name: "Gujarat", d: "M140 155 L175 150 L185 170 L175 200 L150 210 L130 195 L125 175 Z" },
        { name: "Maharashtra", d: "M175 205 L215 200 L230 220 L225 250 L200 265 L175 260 L165 240 Z" },
        { name: "Madhya Pradesh", d: "M200 160 L255 155 L265 175 L260 195 L240 205 L215 210 L205 190 L195 175 Z" },
        { name: "Chhattisgarh", d: "M265 180 L290 175 L300 195 L295 215 L280 225 L265 215 L260 200 Z" },
        { name: "Bihar", d: "M295 145 L330 140 L340 155 L335 170 L310 175 L300 165 Z" },
        { name: "Jharkhand", d: "M305 180 L330 175 L340 190 L335 205 L315 210 L305 200 Z" },
        { name: "West Bengal", d: "M340 160 L365 155 L375 175 L370 195 L355 200 L345 185 Z" },
        { name: "Odisha", d: "M300 220 L325 215 L340 235 L335 255 L315 265 L300 255 L295 240 Z" },
        { name: "Andhra Pradesh", d: "M260 240 L290 235 L300 260 L290 285 L270 295 L255 285 L250 265 Z" },
        { name: "Karnataka", d: "M215 270 L250 265 L260 290 L250 315 L225 325 L210 310 L205 290 Z" },
        { name: "Goa", d: "M200 280 L210 275 L215 285 L210 295 L200 290 Z" },
        { name: "Kerala", d: "M205 320 L225 315 L235 335 L230 355 L210 360 L200 345 Z" },
        { name: "Tamil Nadu", d: "M235 300 L270 295 L285 320 L280 345 L260 355 L240 350 L230 330 Z" },
        { name: "Telangana", d: "M260 225 L285 220 L295 240 L290 260 L275 270 L265 255 Z" },
        { name: "Sikkim", d: "M360 170 L370 165 L375 175 L370 185 L360 180 Z" },
        { name: "Assam", d: "M375 165 L405 160 L415 180 L410 200 L390 205 L380 190 Z" },
        { name: "Arunachal Pradesh", d: "M380 150 L420 145 L435 160 L430 175 L410 180 L385 175 Z" },
        { name: "Nagaland", d: "M420 185 L435 180 L440 195 L435 210 L420 205 Z" },
        { name: "Manipur", d: "M425 215 L440 210 L445 225 L440 240 L425 235 Z" },
        { name: "Mizoram", d: "M420 245 L435 240 L440 255 L435 270 L420 265 Z" },
        { name: "Tripura", d: "M405 210 L420 205 L425 220 L420 235 L405 230 Z" },
        { name: "Meghalaya", d: "M385 195 L405 190 L410 205 L405 220 L385 215 Z" },
        { name: "Puducherry", d: "M270 340 L280 335 L285 345 L280 355 L270 350 Z" }
    ];

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
