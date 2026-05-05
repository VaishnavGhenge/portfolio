const metrics = [
    { prefix: '', value: '3+', label: 'yrs production' },
    { prefix: '+', value: '30%', label: 'billing reliability' },
    { prefix: '−', value: '45%', label: 'build time cut' },
    { prefix: '', value: '5+', label: 'languages shipped' },
];

export default function ImpactMetrics() {
    return (
        <div className="grid grid-cols-2 gap-2 mt-6">
            {metrics.map((m) => (
                <div
                    key={m.label}
                    className="rounded border border-stone-700/50 bg-stone-800/30 px-3 py-2.5 text-center"
                >
                    <div className="text-xl font-bold text-amber-400 font-mono leading-none tabular-nums">
                        {m.prefix}{m.value}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 leading-tight tracking-wide">{m.label}</div>
                </div>
            ))}
        </div>
    );
}
