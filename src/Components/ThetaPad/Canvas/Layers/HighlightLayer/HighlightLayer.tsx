/** HighlightLayer.tsx
 * @file Konva Layer that displays shapes based on highlight state in redux store
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {useAppSelector} from "../../../../../hooks/reduxHooks";
import {highlightSelector} from "../../../../../redux/selectors";
import {HighlightKind} from "../../../../../redux/slices/highlightSlice";
import RemovePolyPointHighlight from "./RemovePolyPointHighlight";
import PointHighlight from "./PointHighlight";


const HighlightLayer: React.FC = () => {
    const {shapeId, subItemIndex, type} = useAppSelector(highlightSelector);

    switch (type) {
        case HighlightKind.RemovePoint:
            return <RemovePolyPointHighlight shapeId={shapeId} index={subItemIndex}/>
        case HighlightKind.Point:
            return <PointHighlight shapeId={shapeId} index={subItemIndex}/>
        default:
            return null;
    }
}


export default HighlightLayer;