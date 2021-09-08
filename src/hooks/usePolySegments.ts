/** usePolySegments.ts
 * @file Hook that returns memoized PolySegment array for the given line
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Poly, PolySegment, PolyUtils} from "../types/shapes";
import {useEffect, useMemo} from "react";
import {useCycle} from "framer-motion";

/**
 * Gives up-to-date poly segments without updating every time irrelevant changes
 * are made to line. Wraps useMemo, calculating dependencies manually.
 * @param {Poly} line - Poly line to get segments of
 * @return {PolySegment[]} - all segments in the given poly
 */
export const usePolySegments = (line: Poly): PolySegment[] => {
    const [updateDep, toggle] = useCycle([0, 1]);
    const segments = useMemo(() => PolyUtils.asSegments(line), [updateDep])

    /**
     * Make relevant comparisons to current state of segments & line, and if a
     * change is detected flip the updateDep, triggering segments to recompute
     */
    useEffect(() => {
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
            toggle();
        }
    }, [line])

    return segments;
}