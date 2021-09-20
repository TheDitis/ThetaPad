/** ImageUploadControl.tsx
 * @file Button in Sidebar for user to upload an image
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import {setImage} from "../../../../../redux/slices/imageSlice";
import {clearShapes} from "../../../../../redux/slices/shapesSlice";
import {recalculateDimensions} from "../../../../../redux/slices/dimensionsSlice";
import {useAppDispatch} from "../../../../../hooks/reduxHooks";
import {resetUnit} from "../../../../../redux/slices/unitSlice";

interface ImageUploadControlStyleProps {

}

const ImageUploadControlRoot = styled.div<ImageUploadControlStyleProps>`

`

/**
 * Button in the sidebar used to upload images
 * @return {JSX.Element} - Button with event handlers for image upload
 */
const ImageUploadControl: React.FC = () => {
    const dispatch = useAppDispatch();

    const loadImage = (img, url) => {
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = url;
        })
    };

    const onChange = async (imageFiles: File[], imageUris: string[]) => {
        const uri = imageUris[0];
        const image = new Image();
        await loadImage(image, uri);

        dispatch(setImage({
            uri,
            size: imageFiles[0].size,
            width: image.width,
            height: image.height
        }));

        dispatch(resetUnit());

        dispatch(recalculateDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        }));

        dispatch(clearShapes());
    }

    return (
        <ImageUploadControlRoot>
            <ImageUploader
                onChange={onChange}
                buttonText={'Choose Image'}
                imgExtension={['.jpg', '.jpeg', '.gif', '.png']}
                maxFileSize={20971520}
                withIcon={false}
                withLabel={false}
                singleImage={true}
                buttonStyles={{backgroundColor: "rgba(0, 255, 255, 0.6)"}}
                fileContainerStyle={{
                    backgroundColor: 'transparent',
                    height: 10,
                    width: 140,
                    margin: 'auto',
                    marginTop: 8,
                    marginBottom: 0
                }}
            />
        </ImageUploadControlRoot>
    );
}

export default ImageUploadControl;