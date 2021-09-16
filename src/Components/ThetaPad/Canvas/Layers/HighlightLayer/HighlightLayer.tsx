/** HighlightLayer.tsx
 * @file Konva Layer that displays shapes based on highlight state in redux store
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {useAppSelector} from "../../../../../hooks/reduxHooks";
import {highlightSelector} from "../../../../../redux/selectors";
import {HighlightKind} from "../../../../../redux/slices/highlightSlice";
import RemovePolyPointHighlight from "./RemovePolyPointHighlight";


const HighlightLayer: React.FC = () => {
    const {shapeId, subItemIndex, type} = useAppSelector(highlightSelector);

    switch (type) {
        case HighlightKind.Remove:
            if (shapeId) {
                console.log(shapeId)
                return <RemovePolyPointHighlight shapeId={shapeId} index={subItemIndex}/>
            }
            return null;
        default:
            return null;
    }
}


export default HighlightLayer;