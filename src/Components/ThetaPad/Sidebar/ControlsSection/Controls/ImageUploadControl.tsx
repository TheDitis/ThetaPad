/** ImageUploadControl.tsx
 * @file Button in Sidebar for user to upload an image
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../redux/store";
import {setImage} from "../../../../../redux/slices/imageSlice";
import {clearShapes} from "../../../../../redux/slices/shapesSlice";
import {calculateImageDims} from "../../../../../redux/slices/dimensionsSlice";
import _ from "lodash";

interface ImageUploadControlStyleProps {

}

const ImageUploadControlRoot = styled.div<ImageUploadControlStyleProps>`

`


const ImageUploadControl: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

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
        }))

        dispatch(calculateImageDims(_.pick(image, "width", "height")))

        dispatch(clearShapes())
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