import {Layer} from "react-konva";
import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import {ShapeMap} from "../../../types/shapes";
import {Line as KonvaLine} from "react-konva"


const ShapesLayerRoot = styled(Layer)`
  width: 100vw;
  height: 100vh;
`

interface ShapesLayerProps {
    shapes: ShapeMap
}

const ShapesLayer: React.FC<ShapesLayerProps> = (props) => {
    const {shapes} = props

    return (
        <ShapesLayerRoot>
            {Object.values(shapes).map(shape => {
                if (shape.isLine()) {
                    return <KonvaLine key={shape.id} x={0} y={0} points={shape.points} stroke={shape.color} strokeWidth={2}/>
                }
                return null;
            })}
        </ShapesLayerRoot>
    )
}


export default ShapesLayer;