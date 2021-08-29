/** ImageLayer.tsx
 * @file Konva Layer that holds the user's image
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect, useRef} from "react";
import {Image as KonvaImage, Layer as KonvaLayer} from "react-konva";
import {imageLayerDimensionsSelector, imageSelector} from "../../../../redux/selectors";
import useImage from "use-image";
import {useAppSelector} from "../../../../redux/hooks";
import Konva from "konva";
import Image = Konva.Image;

const ImageLayer: React.FC = () => {
    const imageData = useAppSelector(imageSelector);
    const dimensions = useAppSelector(imageLayerDimensionsSelector);
    const [image] = useImage(imageData.uri);
    const imageRef = useRef<Image>(null);

    useEffect(() => {
        if (image && imageRef.current !== null) {
            imageRef.current.cache();
        }
    }, [image])

    return (
        <KonvaLayer>
            <KonvaImage
                image={image}
                ref={imageRef}
                width={dimensions.width}
                height={dimensions.height}
                filters={[
                    Konva.Filters.Contrast,
                    Konva.Filters.Brighten,
                    Konva.Filters.Enhance,
                    Konva.Filters.HSV,
                    Konva.Filters.HSL,
                    Konva.Filters.Blur
                ]} //, Konva.Filters.RGB]}
                // blurRadius={50}
                // brightness={-0.3}
                // contrast={100}
                // hue={100}
                // saturation={-10}
                // value={1}
                // luminance={1}

                // red, green, blue and alpha go together (RGBA filter)
                // red={255}
                // green={255}
                // blue={255}
                // alpha={0}



                // enhance={10}
                // kaleidoscopePower={4}
                // kaleidoscopeAngle={45}
            />
        </KonvaLayer>
    )
}

export default ImageLayer;