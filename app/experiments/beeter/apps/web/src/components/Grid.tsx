import { useState } from 'react';

interface GridProps {
    onPatternChange: (pattern: string) => void;
}

export function Grid({ onPatternChange }: GridProps) {
    const [steps, setSteps] = useState(Array(16).fill(false));

    const toggleStep = (index: number) => {
        const newSteps = [...steps];
        newSteps[index] = !newSteps[index];
        setSteps(newSteps);

        // Convert to mini notation
        // Simple Euclidean-like representation or just explicit steps
        // For now, let's just do a simple "bd" on active steps, "~" on inactive
        const pattern = newSteps.map(active => active ? "bd" : "~").join(" ");
        // onPatternChange(`s("${pattern}")`);
        onPatternChange(pattern);
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            width: '300px',
            background: '#F0F0F0',
            padding: '20px',
            borderRadius: '12px'
        }}>
            {steps.map((active, i) => (
                <button
                    key={i}
                    onClick={() => toggleStep(i)}
                    style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        borderRadius: '40%',
                        border: 'none',
                        background: active ? '#D93846' : '#E0E0E0',
                        boxShadow: active ? '0 4px 6px rgba(0,0,0,0.1)' : 'inset 0 2px 4px rgba(0,0,0,0.1)',
                        transform: active ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.1s ease',
                        cursor: 'pointer'
                    }}
                />
            ))}
        </div>
    );
}
