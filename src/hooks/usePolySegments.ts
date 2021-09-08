/** usePolySegments.ts
 * @file Hook that returns memoized PolySegment array for the given line
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Poly, PolySegment, PolyUtils} from "../types/shapes";
import {useEffect, useState} from "react";

/**
 * Gives up-to-date poly segments without updating every time irrelevant changes
 * are made to line. Wraps useMemo, calculating dependencies manually.
 * @param {Poly} line - Poly line to get segments of
 * @return {PolySegment[]} - all segments in the given poly
 */
export const usePolySegments = (line: Poly): PolySegment[] => {
    const [segments, setSegments] = useState<PolySegment[]>([]);

    /**
     * Makes relevant comparisons to current state of segments & line, and if a
     * change is detected, recompute segments
     */
    const refresh = () => {
        const i = segments.length - 1;
        const sameLength = segments.length === line.lengths.length
        const endsDontMatch = (
            segments.length && (
                segments[i].length !== line.lengths[i]
                || segments[i].angle !== line.lineAngles[i]
            )
        )
        // If a segment was added or removed, or the lengths aren't equal
        if (!sameLength || endsDontMatch) {
            setSegments(PolyUtils.asSegments(line));
        }
    }

    /** Every time line changes, check if segments needs to be updated too */
    useEffect(() => {
        refresh();
        // eslint-disable-next-line
    }, [line])

    return segments;
}