/** ShapesLayer.tsx
 * @file The layer in Canvas that holds the drawn konva shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Layer} from "react-konva";
import React from "react";
import {Shape, ShapeMap} from "../../../types/shapes";
import DrawnShape from "./DrawnShape";



interface ShapesLayerProps {
    shapes: ShapeMap;
    tempShape: Shape | null;
}


/**
 * The Konva layer that holds the drawn shapes
 * @param {React.PropsWithChildren<ShapesLayerProps>} props
 */
const ShapesLayer: React.FC<ShapesLayerProps> = (props) => {
    const {shapes, tempShape} = props

    return (
        <Layer>
            {Object.values(shapes).map(shape => (
                <DrawnShape key={shape.id} shape={shape}/>
            ))}
            {tempShape !== null && <DrawnShape shape={tempShape}/>}
        </Layer>
    )
}


export default ShapesLayer;