/** ShapesLayer.tsx
 * @file The layer in Canvas that holds the drawn konva shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Layer} from "react-konva";
import React from "react";
import DrawnShape, {MemoizedDrawnShape} from "./DrawnShapes/DrawnShape";
import {RootState} from "../../../../../redux/store";
import {shapesIdsSelector} from "../../../../../redux/selectors";
import {useAppSelector} from "../../../../../hooks/reduxHooks";

/**
 * Fragment of DrawShapes for all completed shapes
 * @return {JSX.Element} - Fragment of DrawShapes for all completed shapes
 */
const DrawnShapes: React.FC = () => {
    const shapeIds = useAppSelector(shapesIdsSelector);
    return (
        <>
            {Object.values(shapeIds).map((shapeId) => (
                <MemoizedDrawnShape key={shapeId} shapeId={shapeId}/>
            ))}
        </>
    )
}

/**
 * DrawnShape for the tempShape being drawn, or null if none is
 * @return {JSX.Element | null} -DrawnShape for the tempShape being drawn, or
 *      null if none is
 */
const DrawnTempShape: React.FC = () => {
    const tempShape = useAppSelector((state: RootState) => state.tempShape)
    return tempShape !== null ? (
        <DrawnShape shape={tempShape}/>
    ) : null;
}


/** The Konva layer that holds the drawn shapes */
const ShapesLayer: React.FC = () => {
    return (
        <Layer>
            <DrawnShapes/>
            <DrawnTempShape/>
        </Layer>
    )
}


export default ShapesLayer;