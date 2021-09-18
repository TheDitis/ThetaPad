/** HighlightLayer.tsx
 * @file Konva Layer that displays shapes based on highlight state in redux store
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import {useAppSelector} from "../../../../../hooks/reduxHooks";
import {highlightSelector} from "../../../../../redux/selectors";
import {HighlightKind} from "../../../../../redux/slices/highlightSlice";
import RemovePolyPointHighlight from "./PointHighlights/RemovePolyPointHighlight";
import PointHighlight from "./PointHighlights/PointHighlight";
import LengthHighlight from "./LengthHighlights/LengthHighlight";


const HighlightLayer: React.FC = () => {
    const {shapeId, subItemIndex, type} = useAppSelector(highlightSelector);

    switch (type) {
        case HighlightKind.RemovePoint:
            return <RemovePolyPointHighlight shapeId={shapeId} index={subItemIndex}/>
        case HighlightKind.Point:
            return <PointHighlight shapeId={shapeId} index={subItemIndex}/>
        case HighlightKind.Length:
            return <LengthHighlight shapeId={shapeId} index={subItemIndex}/>
        default:
            return null;
    }
}


export default HighlightLayer;