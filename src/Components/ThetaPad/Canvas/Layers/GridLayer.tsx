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
type BasicLine = [number, number, number, number]


const createVerticalLines = ({width, height, nColumns}: StructuralGridParamsType): BasicLine[] => {
    const xs = _.range(0, width + 1, width / nColumns);
    return xs.map((x) => (
        [x, 0, x, Math.round(height)]
    ))
}

const createHorizontalLines = ({width, height, nRows}: StructuralGridParamsType): BasicLine[] => {
    const ys = _.range(0, height + 1, height / nRows);
    return ys.map((y) => (
        [0, y, width, y]
    ))
}

const GridLayer: React.FC = () => {
    const gridStructure = useSelector(gridStructuralParamsSelector);
    const gridStyle = useSelector(gridStyleParamsSelector)
    const [gridLines, setGridLines] = useState<BasicLine[]>([]);

    /** Recalculate grid every time structural params change */
    useEffect(() => {
        let tempGridLines: BasicLine[] = []
        tempGridLines.push(...createVerticalLines(gridStructure))
        tempGridLines.push(...createHorizontalLines(gridStructure))
        setGridLines(tempGridLines)
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