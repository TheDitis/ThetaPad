/** DownloadImageButton.tsx
 * @file Button in navbar to download image
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {FileDownload} from "@mui/icons-material";
import {downloadImage} from "../../../redux/slices/sessionSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {imageLayerDimensionsSelector} from "../../../redux/selectors";
import {warn} from "../../../redux/slices/alertSlice";
import {IconButton} from "@mui/material";


interface DownloadImageButtonProps {
}

const DownloadImageButton: React.FC<DownloadImageButtonProps> = () => {
    const dispatch = useAppDispatch();
    const imageLayerDims = useAppSelector(imageLayerDimensionsSelector);

    const disabled = imageLayerDims.width === 0 || imageLayerDims.height === 0

    return (
        <IconButton
            onClick={() => !disabled
                ? dispatch(downloadImage())
                : dispatch(warn("You must upload an image before downloading!"))
            }
            // disabled={imageLayerDims.width === 0 || imageLayerDims.height === 0}
            color={"secondary"}
            style={{opacity: disabled ? 0.4 : 1, marginRight: 20, borderRadius: 0}}
        >
            <FileDownload
                color={"inherit"}
            />
        </IconButton>
    )
}


export default DownloadImageButton;