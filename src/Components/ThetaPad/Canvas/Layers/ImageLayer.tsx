/** ImageLayer.tsx
 * @file Konva Layer that holds the user's image
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {Image as KonvaImage, Layer as KonvaLayer} from "react-konva";
import {imageLayerDimensionsSelector, imageSelector} from "../../../../redux/selectors";
import useImage from "use-image";
import {useAppSelector} from "../../../../redux/hooks";

const ImageLayer: React.FC = () => {
    const imageData = useAppSelector(imageSelector);
    const dimensions = useAppSelector(imageLayerDimensionsSelector);
    const [image] = useImage(imageData.uri);

    return (
        <KonvaLayer>
            <KonvaImage
                image={image}
                width={dimensions.width}
                height={dimensions.height}
            />
        </KonvaLayer>
    )
}

export default ImageLayer;