/** PolyProfileDetailsSection.tsx
 * @file The section to show in the dropdown of the PolyLineProfile
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {Poly} from "../../../../../../../types/shapes";


interface PolyProfileDetailsSectionStyleProps {
}

const PolyProfileDetailsSectionRoot = styled.div<PolyProfileDetailsSectionStyleProps>`
  width: 100px;
  height: 100px;
  background: purple;
  
`

interface PolyProfileDetailsSectionProps {
    line: Poly;
}

const PolyProfileDetailsSection: React.FC<PolyProfileDetailsSectionProps> = ({line}) => {
    return (
        <PolyProfileDetailsSectionRoot>

        </PolyProfileDetailsSectionRoot>
    )
}


export default PolyProfileDetailsSection;