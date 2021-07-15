/** ShapesLayer.tsx
 * @file The layer in Canvas that holds the drawn konva shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Layer} from "react-konva";
import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {Shape, ShapeMap} from "../../../types/shapes";
import {Line as KonvaLine} from "react-konva"
import {TempShapesContext} from "../../../ThetaPad";


const DrawnShape = ({shape}) => {
    if (shape === undefined) return null
    if (shape.isLine()) {
        return (
            <KonvaLine
                x={0}
                y={0}
                points={shape.points}
                stroke={shape.color}
                strokeWidth={2}
            />
        )
    }
    return null;
}


const ShapesLayerRoot = styled(Layer)`
`

interface ShapesLayerProps {
    shapes: ShapeMap;
    tempShape: Shape | null;
}

const ShapesLayer: React.FC<ShapesLayerProps> = (props) => {
//    const tempShape = useContext(TempShapesContext);
    const {shapes, tempShape} = props
    useEffect(() => {
        console.log("tempShape udpated: ", tempShape);
    }, [tempShape]);


    return (
        <ShapesLayerRoot>
            {Object.values(shapes).map(shape => (
                <DrawnShape key={shape.id} shape={shape}/>
            ))}
            {tempShape !== null ? <DrawnShape shape={tempShape}/> : null}
        </ShapesLayerRoot>
    )
}


export default ShapesLayer;