/** ShapesLayer.tsx
 * @file The layer in Canvas that holds the drawn konva shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Layer} from "react-konva";
import React from "react";
import DrawnShape from "./DrawnShapes/DrawnShape";
import {RootState} from "../../../../../redux/store";
import {shapesSelector} from "../../../../../redux/selectors";
import {ShapeMap} from "../../../../../redux/slices/shapesSlice";
import {useAppSelector} from "../../../../../redux/hooks";

/**
 * Fragment of DrawShapes for all completed shapes
 * @return {JSX.Element} - Fragment of DrawShapes for all completed shapes
 */
const DrawnShapes: React.FC = () => {
    const shapes: ShapeMap = useAppSelector(shapesSelector);
    return (
        <>
            {Object.values(shapes).map((shape) => (
                <DrawnShape key={shape.id} shape={shape}/>
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