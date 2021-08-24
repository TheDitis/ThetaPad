/** PolyProfileDetailsSection.tsx
 * @file The section to show in the dropdown of the PolyLineProfile
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {Poly, PolyUtils} from "../../../../../../../types/shapes";
import PolySegmentProfile from "./PolySegmentProfile";


interface PolyProfileDetailsSectionStyleProps {
}

const PolyProfileDetailsSectionRoot = styled.div<PolyProfileDetailsSectionStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  background: rgba(0, 0, 0, 0.13);
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
        </PolyProfileDetailsSectionRoot>
    )
}


export default PolyProfileDetailsSection;
