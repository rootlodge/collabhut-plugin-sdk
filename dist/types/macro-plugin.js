/**
 * Apply a macro control value to a set of parameter values.
 *
 * Pure function — returns a new params record with mapped values applied.
 */
export function applyMacroControl(params, macro, normalizedValue) {
    const clamped = Math.max(0, Math.min(1, normalizedValue));
    const result = { ...params };
    for (const mapping of macro.mappings) {
        const mapped = mapping.minValue + (mapping.maxValue - mapping.minValue) * clamped;
        result[mapping.targetParamId] = mapped;
    }
    return result;
}
/**
 * Interpolate between two preset value snapshots.
 *
 * Used for preset morphing — blends numeric parameters linearly,
 * keeps boolean/string values from whichever preset is closer to `t`.
 *
 * @param a  First preset values
 * @param b  Second preset values
 * @param t  Blend factor, 0 = fully `a`, 1 = fully `b`
 */
export function interpolatePresets(a, b, t) {
    const clamped = Math.max(0, Math.min(1, t));
    const result = {};
    const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of allKeys) {
        const valA = a[key];
        const valB = b[key];
        if (typeof valA === "number" && typeof valB === "number") {
            result[key] = valA + (valB - valA) * clamped;
        }
        else if (clamped < 0.5) {
            if (valA !== undefined) {
                result[key] = valA;
            }
            else if (valB !== undefined) {
                result[key] = valB;
            }
        }
        else {
            if (valB !== undefined) {
                result[key] = valB;
            }
            else if (valA !== undefined) {
                result[key] = valA;
            }
        }
    }
    return result;
}
/**
 * Generate randomized parameter values within safe ranges.
 *
 * Uses the param definitions to stay within [min, max] for range params,
 * randomly toggles booleans, and picks random choices.
 */
export function randomizeParams(params, randomFn = Math.random) {
    const result = {};
    for (const param of params) {
        switch (param.type) {
            case "range":
                result[param.id] = param.min + (param.max - param.min) * randomFn();
                break;
            case "bool":
                result[param.id] = randomFn() > 0.5;
                break;
            case "choice":
                result[param.id] = param.choices[Math.floor(randomFn() * param.choices.length)].value;
                break;
        }
    }
    return result;
}
