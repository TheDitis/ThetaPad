/** PolyProfileDetailsSection.tsx
 * @file The section to show in the dropdown of the PolyLineProfile
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {Poly, PolyUtils} from "../../../../../../../types/shapes";
import PolySegmentProfile from "./PolySegmentProfile";
import {POLY_SEGMENT_HEIGHT} from "../../../../../../constants";


interface PolyProfileDetailsSectionStyleProps {
}

const PolyProfileDetailsSectionRoot = styled.div<PolyProfileDetailsSectionStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  position: relative;;
`

interface PolyProfileDetailsSectionProps {
    line: Poly;
}

const PolyProfileDetailsSection: React.FC<PolyProfileDetailsSectionProps> = ({line}) => {
    return (
        <PolyProfileDetailsSectionRoot>
            {PolyUtils.asSegments(line).map((segment, index) => (
                <PolySegmentProfile key={index} segment={segment} index={index} shapeId={line.id}/>
            ))}
            <LineNodesSvg line={line}/>
        </PolyProfileDetailsSectionRoot>
    )
}


export default PolyProfileDetailsSection;


interface LineNodeSvgProps {
    line: Poly
}
const LineNodesSvg: React.FC<LineNodeSvgProps> = ({line}) => {
    const height = POLY_SEGMENT_HEIGHT * (line.angles.length + 1);
    const width = POLY_SEGMENT_HEIGHT;
    const xLoc = POLY_SEGMENT_HEIGHT / 2;
    const yOffset = 15;
    const nodeRadius = 10;

    const yLoc = (index) => (POLY_SEGMENT_HEIGHT * index) + yOffset + nodeRadius


    return (
        <svg style={{position: "absolute", right: 0, top: -nodeRadius}} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {line.lengths.map((pt, index) => {
                return <line x1={xLoc} y1={yLoc(index)} x2={xLoc} y2={yLoc(index + 1)} stroke={"rgb(110, 100, 100)"} strokeWidth={2} />
            })}
            {line.points.map((pt, index) => {
                return (
                    <circle cx={xLoc} cy={yLoc(index)} r={nodeRadius} stroke={"rgb(110, 110, 110)"} strokeWidth={2} fill={"white"}/>
                )
            })}
        </svg>
    )
}