/** GridLayer.tsx
 * @file Konva layer that renders grid lines
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect, useState} from "react";
import {Layer as KonvaLayer, Line as KonvaLine} from "react-konva";
import {useSelector} from "react-redux";
import {gridStructuralParamsSelector, gridStyleParamsSelector} from "../../../../redux/selectors";
import {StructuralGridParamsType} from "../../../../redux/slices/gridSlice";
import _ from "lodash";

// Points of line   x1      y1      x2      y2
type BasicLine = [number, number, number, number];

/**
 * Creates all of the vertical lines for the grid
 * @param {number} width - the width the grid will span
 * @param {number} height - the height the grid will span
 * @param {number} nColumns - number of columns the grid will have
 * @return {BasicLine[]} - array of arrays of points, each representing a grid line
 */
const createVerticalLines = ({width, height, nColumns}: StructuralGridParamsType): BasicLine[] => {
    const xs = _.range(0, width + 1, width / nColumns);
    return xs.map((x) => (
        [x, 0, x, Math.round(height)]
    ))
}

/**
 * Creates all of the horizontal lines for the grid
 * @param {number} width - the width the grid will span
 * @param {number} height - the height the grid will span
 * @param {number} nRows - number of rows the grid will have
 * @return {BasicLine[]} - array of arrays of points, each representing a grid line
 */
const createHorizontalLines = ({width, height, nRows}: StructuralGridParamsType): BasicLine[] => {
    const ys = _.range(0, height + 1, height / nRows);
    return ys.map((y) => (
        [0, y, width, y]
    ))
}

/**
 * Creates all of the inclined diagonal lines for the grid
 * @param {BasicLine[]} lines1 - array of lines of one orientation
 * @param {BasicLine[]} lines2 - array of lines of the opposite orientation
 * @return {BasicLine[]} - array of arrays of points, each representing a grid line
 */
const createInclineDiagonalLines = (lines1: BasicLine[], lines2: BasicLine[]) => {
    const [shorter, longer] = [lines1, lines2].sort((a, b) => a.length - b.length);
    return _.flatMap(longer, (_, i) => {
        if (i < shorter.length - 1) {
            // i flipped to the opposite side of each array:
            const longFlipI = longer.length - (i + 1);
            const shortFlipI = shorter.length - (i + 1);
            return [
                [...longer[i].slice(0, 2), ...shorter[i].slice(0, 2)],
                [...longer[longFlipI].slice(2), ...shorter[shortFlipI].slice(2)]
            ]
        } else {
            // index of the corresponding endpoint in the same array
            const altInd = (i - shorter.length + 1) % longer.length;
            return [[...longer[i].slice(0, 2), ...longer[altInd].slice(2)]]
        }
    }) as BasicLine[];
}

/**
 * Creates all of the declined diagonal lines for the grid
 * @param {BasicLine[]} lines1 - array of lines of one orientation
 * @param {BasicLine[]} lines2 - array of lines of the opposite orientation
 * @return {BasicLine[]} - array of arrays of points, each representing a grid line
 */
const createDeclineDiagonalLines = (lines1: BasicLine[], lines2: BasicLine[]) => {
    const [shorter, longer] = [lines1, lines2].sort((a, b) => a.length - b.length);
    return _.flatMap(longer, (_, i) => {
        if (i < shorter.length - 1) {
            // i flipped to the opposite side of each array:
            const longFlipI = longer.length - (i + 1);
            const shortFlipI = shorter.length - (i + 1);
            return [
                [...longer[i].slice(2), ...shorter[shortFlipI].slice(0, 2)],
                [...longer[longFlipI].slice(0, 2), ...shorter[i].slice(2)]
            ]
        } else {
            // index of the corresponding endpoint in the same array
            const altInd = (i - shorter.length + 1) % longer.length;
            return [[...longer[altInd].slice(0, 2), ...longer[i].slice(2)]]
        }
    }) as BasicLine[];
}

const GridLayer: React.FC = () => {
    const gridStructure = useSelector(gridStructuralParamsSelector);
    const gridStyle = useSelector(gridStyleParamsSelector)
    const [gridLines, setGridLines] = useState<BasicLine[]>([]);

    /** Recalculate grid every time structural params change */
    useEffect(() => {
        let tempGridLines: BasicLine[] = []
        const vertical = createVerticalLines(gridStructure);
        const horizontal = createHorizontalLines(gridStructure);
        const incline = createInclineDiagonalLines(horizontal, vertical);
        const decline = createDeclineDiagonalLines(horizontal, vertical);
        tempGridLines.push(...vertical, ...horizontal, ...incline, ...decline);
        setGridLines(tempGridLines);
    }, [gridStructure])


    return (
        <KonvaLayer>
            {gridLines.map((points, i) => (
                <KonvaLine
                    key={"gridLine" + i.toString()}
                    points={points}
                    strokeWidth={gridStyle.strokeWidth}
                    stroke={gridStyle.color}
                    opacity={gridStyle.opacity}
                />
            ))}
        </KonvaLayer>
    )
}


export default GridLayer;