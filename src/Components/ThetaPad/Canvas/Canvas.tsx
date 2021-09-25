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
import {useAppSelector} from "../../../hooks/reduxHooks";
import HighlightLayer from "./Layers/HighlightLayer/HighlightLayer";
import {toPng} from "html-to-image";
import download from "downloadjs";
import {Dimensions} from "../../../redux/slices/imageSlice";

interface CanvasStyleProps {
    dimensions: AppDimensions;
}

const CanvasRoot = styled.div<CanvasStyleProps>`
  position: relative;
  width: ${props => props.dimensions.width - props.dimensions.sidebar}px;
  height: ${props => props.dimensions.height - props.dimensions.navbar};
  background: rgb(189, 233, 248);
`

const downloadNodeAsImage = (node: HTMLElement, dimensions: Dimensions) => {
    toPng(node)
        .then((dataUrl) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext('2d');

            if (ctx !== null && dimensions.width > 10 && dimensions.height > 10) {
                canvas.width = dimensions.width;
                canvas.height = dimensions.height;
                const image = new Image();
                image.src = dataUrl
                image.onload = () => {
                    ctx.drawImage(image, 0, 0)
                    const url = canvas.toDataURL('image/png');
                    download(url, "image.png")
                }
            }
        })
}


/**
 * Main portion of the ThetaPad app, where the image, grid, shapes, etc go
 * @return {JSX.Element} - Div with several Konva Stages & layers for different elements
 */
const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const dimensions = useAppSelector(dimensionsSelector);
    const gridIsActive = useAppSelector(gridIsActiveSelector);
    const imageFilter = useAppSelector(filtersCssString);


    useEffect(() => {
        if (canvasRef.current !== null) {
            downloadNodeAsImage(canvasRef.current, dimensions.image);
        }
    }, [canvasRef, dimensions])

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
