/** ImageLayer.tsx
 * @file Konva Layer that holds the user's image
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Image as KonvaImage, Layer as KonvaLayer} from "react-konva";
import {useSelector} from "react-redux";
import {imageLayerDimensionsSelector, imageSelector} from "../../../../redux/selectors";
import useImage from "use-image";


const ImageLayer: React.FC = () => {
    const imageData = useSelector(imageSelector);
    const dimensions = useSelector(imageLayerDimensionsSelector);
    const [image] = useImage(imageData.uri);

    return (
        <KonvaLayer>
            <KonvaImage image={image} width={dimensions.width} height={dimensions.height}/>
        </KonvaLayer>
    )
}

export default ImageLayer;