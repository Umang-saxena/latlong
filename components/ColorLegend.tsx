import { Card } from "@/components/ui/card";

const ColorLegend = () => {
    const legendItems = [
        { label: "< 35%", color: "hsl(var(--vac-very-low))" },
        { label: "35-40%", color: "hsl(var(--vac-low))" },
        { label: "40-45%", color: "hsl(var(--vac-medium))" },
        { label: "45-50%", color: "hsl(var(--vac-high))" },
        { label: "≥ 50%", color: "hsl(var(--vac-very-high))" },
    ];

    return (
        <Card className="p-4 border-border">
            <h3 className="text-sm font-semibold mb-3 text-foreground">Vaccination Coverage</h3>
            <div className="flex flex-wrap gap-3">
                {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-6 h-6 rounded border border-border shadow-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default ColorLegend;
