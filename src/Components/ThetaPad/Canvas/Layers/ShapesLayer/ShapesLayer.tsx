/** ShapesLayer.tsx
 * @file The layer in Canvas that holds the drawn konva shapes
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Layer} from "react-konva";
import React from "react";
import styled from "styled-components";
import {ShapeMap} from "../../../types/shapes";
import {Line as KonvaLine} from "react-konva"
import {Dimensions} from "../../../ThetaPad";


const ShapesLayerRoot = styled(Layer)`
`

interface ShapesLayerProps {
    dimensions: Dimensions;
    shapes: ShapeMap;
}

const ShapesLayer: React.FC<ShapesLayerProps> = (props) => {
    const {shapes, dimensions} = props

    return (
        <ShapesLayerRoot>
            {Object.values(shapes).map(shape => {
                if (shape.isLine()) {
                    return (
                        <KonvaLine
                            key={shape.id}
                            x={-dimensions.sidebar}
                            y={0}
                            points={shape.points}
                            stroke={shape.color}
                            strokeWidth={2}
                        />
                    )
                }
                return null;
            })}
        </ShapesLayerRoot>
    )
}


export default ShapesLayer;