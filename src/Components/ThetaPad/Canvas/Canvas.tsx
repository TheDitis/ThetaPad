/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {AppDimensions} from "../../../redux/slices/dimensionsSlice";
import KonvaStageWithReduxBridge from "./Layers/ShapesLayer/KonvaStageWithReduxBridge";
import {dimensionsSelector, filtersCssString, gridIsActiveSelector} from "../../../redux/selectors";
import {handleCanvasClick, handleMouseMove} from "./canvasEventHandlers";
import ImageLayer from "./Layers/ImageLayer";
import GridLayer from "./Layers/GridLayer";
import {useAppSelector} from "../../../redux/hooks";

interface CanvasStyleProps {
    dimensions: AppDimensions;
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - props.dimensions.navbar};
  background: rgb(156, 231, 255);
`


/**
 * Contains the image and the shapes. This is the drawing area
 * @return {JSX.Element} - Container For
 * @constructor
 */
const Canvas: React.FC = () => {
    const dimensions = useAppSelector(dimensionsSelector);
    const gridIsActive = useAppSelector(gridIsActiveSelector);
    const imageFilter = useAppSelector(filtersCssString);

    return (
        <CanvasRoot
            dimensions={dimensions}
            onMouseDown={handleCanvasClick}
            onMouseUp={handleCanvasClick}
            onMouseMove={handleMouseMove}
        >
            <KonvaStageWithReduxBridge
                width={dimensions.width - dimensions.sidebar}
                height={dimensions.height - dimensions.navbar}
                style={{
                    position: "absolute",
                    filter: imageFilter //+ " saturate(1)",
                }}
            >
                <ImageLayer/>
            </KonvaStageWithReduxBridge>

            <KonvaStageWithReduxBridge
                width={dimensions.width - dimensions.sidebar}
                height={dimensions.height - dimensions.navbar}
            >
                {gridIsActive && <GridLayer/>}
                <ShapesLayer/>
            </KonvaStageWithReduxBridge>
        </CanvasRoot>
    )
}


export default Canvas;
