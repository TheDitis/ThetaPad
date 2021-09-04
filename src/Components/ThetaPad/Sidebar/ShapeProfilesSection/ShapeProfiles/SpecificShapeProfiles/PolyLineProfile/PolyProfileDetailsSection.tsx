/** PolyProfileDetailsSection.tsx
 * @file The section to show in the dropdown of the PolyLineProfile
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {Poly, PolyUtils} from "../../../../../../../types/shapes";
import PolySegmentProfile from "./PolySegmentProfile";
import PolyProfileNodesSvg from "./PolyProfileNodesSvg";


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

/**
 * The list of sub-segment profiles shown in the PolyProfile dropdown menu
 * @param {Poly} line - the poly line the profile is linked to
 * @return {JSX.Element} - flex-column of segment profiles
 * @constructor
 */
const PolyProfileDetailsSection: React.FC<PolyProfileDetailsSectionProps> = ({line}) => {
    return (
        <PolyProfileDetailsSectionRoot>
            {PolyUtils.asSegments(line).map((segment, index) => (
                <PolySegmentProfile key={index} segment={segment} index={index} shapeId={line.id}/>
            ))}
            <PolyProfileNodesSvg line={line}/>
        </PolyProfileDetailsSectionRoot>
    )
}


export default PolyProfileDetailsSection
