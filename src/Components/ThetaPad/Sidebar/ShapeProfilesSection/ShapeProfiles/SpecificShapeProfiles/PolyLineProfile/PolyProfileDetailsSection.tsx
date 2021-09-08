/** PolyProfileDetailsSection.tsx
 * @file The section to show in the dropdown of the PolyLineProfile
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React, {useEffect, useMemo, useState} from "react";
import {Poly, PolySegment, PolyUtils} from "../../../../../../../types/shapes";
import PolySegmentProfile from "./PolySegmentProfile";
import PolyProfileNodesSvg from "./PolyProfileNodesSvg";
import {SHAPE_PROFILE_HEIGHT} from "../../../../../../../constants";
import {limitValue} from "../../../../../../../utils/utils";
import {motion} from "framer-motion";


interface PolyProfileDetailsSectionStyleProps {
    numSegments: number;
}

const PolyProfileDetailsSectionRoot = styled(motion.div)<PolyProfileDetailsSectionStyleProps>`
  width: 100%;
  overflow-y: ${({numSegments}) => numSegments > 1 ? "scroll" : "hidden"};
  height: ${({numSegments}) => SHAPE_PROFILE_HEIGHT * limitValue(numSegments, 1.2, 3)}px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  position: relative;
`



interface PolyProfileDetailsSectionProps {
    line: Poly;
}

/**
 * The list of sub-segment profiles shown in the PolyProfile dropdown menu
 * @param {Poly} line - the poly line the profile is linked to
 * @return {JSX.Element} - flex-column of segment profiles
 */
const PolyProfileDetailsSection: React.FC<PolyProfileDetailsSectionProps> = ({line}) => {
    const [segments, setSegments] = useState<PolySegment[]>([]);


    useEffect(() => {
        console.log("line changed!")
        console.log("segments.length: ", segments.length)
        if (segments.length !== line.lengths.length) {
            console.log("branch 1")
            setSegments(PolyUtils.asSegments(line))
        }
        else {
            const i = segments.length - 1;
            if (segments.length && (
                segments[i].length !== line.lengths[i]
                || segments[i].angle !== line.lineAngles[i]
                || segments[i].pointAngle !== line.angles[i]
            )) {
                console.log("branch 2")
                setSegments([
                    ...segments.slice(0, i),
                    PolyUtils.getSegment(line, i)]
                )
            }
        }
    }, [line, segments])

    return (
        <PolyProfileDetailsSectionRoot
            numSegments={line.lineAngles.length}
        >
            {segments.map((segment, index) => (
                <PolySegmentProfile
                    key={index.toString() + segment.length.toString()}
                    segment={segment}
                    index={index}
                    shapeId={line.id}
                />
            ))}
            <PolyProfileNodesSvg line={line}/>
        </PolyProfileDetailsSectionRoot>
    )
}


export default React.memo(
    PolyProfileDetailsSection,
    (p, n) => {
        const anglesMatch = p.line.angles.length === n.line.angles.length
            && p.line.angles[p.line.angles.length - 1] === n.line.angles[n.line.angles.length - 1]
        const lengthsMatch = p.line.lengths.length === n.line.lengths.length
            && p.line.lengths[p.line.lengths.length - 1] === n.line.lengths[n.line.lengths.length - 1]
        // console.log("PP DetailsSection memoization check. Should rerender: ", !(anglesMatch && lengthsMatch))
        const colorsMatch = p.line.color === n.line.color;
        return anglesMatch && lengthsMatch && colorsMatch;
    }
);
