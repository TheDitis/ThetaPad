//export {}
/** ShapesLayer.tsx
 * @file The layer in Canvas that holds the drawn konva shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Layer} from "react-konva";
import React from "react";
import DrawnShape from "./DrawnShape";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../redux/store";
import {shapesSelector} from "../../../../../redux/selectors";

const DrawnShapes = (props) => {
    const shapes = useSelector(shapesSelector);
    return (
        <>
            {Object.values(shapes).map((shape) => (
                <DrawnShape key={shape.id} shape={shape}/>
            ))}
        </>
    )
}

const DrawnTempShape = (props) => {
    const tempShape = useSelector((state: RootState) => state.tempShape)
    return tempShape !== null ? (
        <DrawnShape shape={tempShape}/>
    ) : null;
}

interface ShapesLayerProps {
}


/**
 * The Konva layer that holds the drawn shapes
 * @param {React.PropsWithChildren<ShapesLayerProps>} props
 */
const ShapesLayer: React.FC<ShapesLayerProps> = (props) => {
    return (
        <Layer>
            <DrawnShapes/>
            <DrawnTempShape/>
        </Layer>
    )
}


export default ShapesLayer;