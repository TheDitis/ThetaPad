import {Layer} from "react-konva";
import React, {useContext} from "react";
import styled from "styled-components";
import {ThetaPadContext, ShapeKind} from "../../../ThetaPad";
import {Line as KonvaLine} from "react-konva"
import uuid from "react-uuid";

const ShapesLayerRoot = styled(Layer)`
  width: 100vw;
  height: 100vh;
`

const ShapesLayer: React.FC = () => {
    const {shapes} = useContext(ThetaPadContext)
    return (
        <ShapesLayerRoot>
            {shapes.map(shape => {
                if (shape.isLine()) {
                    return <KonvaLine key={uuid()} x={0} y={0} points={shape.points} stroke={shape.color} strokeWidth={2}/>
                }
                return null;
            })}
            {/*<KonvaLine x={0} y={0} points={[0, 0, 400, 400]} stroke={"red"} strokeWidth={2}/>*/}
        </ShapesLayerRoot>
    )
}


export default ShapesLayer;