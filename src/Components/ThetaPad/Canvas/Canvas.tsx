/** Canvas.tsx
 * @file The drawing & image area component
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import ShapesLayer from "./Layers/ShapesLayer/ShapesLayer";
import {AppDimensions} from "../../../redux/slices/dimensionsSlice";
import KonvaStageWithReduxBridge from "./Layers/ShapesLayer/KonvaStageWithReduxBridge";
import {dimensionsSelector, filtersCssString, gridIsActiveSelector} from "../../../redux/selectors";
import {handleCanvasClick, handleMouseMove} from "./canvasEventHandlers";
import ImageLayer from "./Layers/ImageLayer";
import GridLayer from "./Layers/GridLayer";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import HighlightLayer from "./Layers/HighlightLayer/HighlightLayer";
import {setCanvasId} from "../../../redux/slices/sessionSlice";

interface CanvasStyleProps {
    dimensions: AppDimensions;
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  position: relative;
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - props.dimensions.navbar};
  background: rgb(20, 20, 20);
`


/**
 * Main portion of the ThetaPad app, where the image, grid, shapes, etc go
 * @return {JSX.Element} - Div with several Konva Stages & layers for different elements
 */
const Canvas: React.FC = () => {
    const dispatch = useAppDispatch();
    const canvasRef = useRef<HTMLDivElement>(null);
    const dimensions = useAppSelector(dimensionsSelector);
    const gridIsActive = useAppSelector(gridIsActiveSelector);
    const imageFilter = useAppSelector(filtersCssString);


    useEffect(() => {
        if (canvasRef.current !== null) {
            dispatch(setCanvasId(canvasRef.current.className))
        }
    }, [canvasRef, dispatch])

    return (
        <CanvasRoot
            ref={canvasRef}
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
                <HighlightLayer/>
            </KonvaStageWithReduxBridge>
        </CanvasRoot>
    )
}


export default Canvas;
