/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {Dimensions} from "../../../redux/slices/dimensionsSlice";
import {useSelector} from "react-redux";
import StageWithReduxBridge from "./Layers/ShapesLayer/StageWithReduxBridge";
import {dimensionsSelector} from "../../../redux/selectors";
import {handleCanvasClick, handleMouseMove} from "./canvasEventHandlers";

interface CanvasStyleProps {
    dimensions: Dimensions;
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - props.dimensions.navbar};
  background: rgb(156, 231, 255);
`



interface CanvasProps {
}

const Canvas: React.FC<CanvasProps> = (() => {
    const dimensions = useSelector(dimensionsSelector);
//    const dispatch = useDispatch<AppDispatch>();


    return (
        <CanvasRoot
            dimensions={dimensions}
            onMouseDown={handleCanvasClick}
            onMouseUp={handleCanvasClick}
            onMouseMove={handleMouseMove}
        >
            <StageWithReduxBridge
                width={dimensions.width - dimensions.sidebar}
                height={dimensions.height - dimensions.navbar}
            >
                <ShapesLayer/>
            </StageWithReduxBridge>
        </CanvasRoot>
    )
})


export default Canvas;
