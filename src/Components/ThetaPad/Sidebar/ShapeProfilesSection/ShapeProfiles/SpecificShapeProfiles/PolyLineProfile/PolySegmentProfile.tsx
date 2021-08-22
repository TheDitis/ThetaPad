/** PolySegmentProfile.tsx
 * @file Profile row of one segment of a poly-line
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {PolySegment} from "../../../../../../../types/shapes";
import ShapeInfoItem from "../../ShapeInfoItem";


interface PolySegmentProfileStyleProps {
}

const PolySegmentProfileRoot = styled.div<PolySegmentProfileStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  background: rgba(0, 0, 0, 0.13);


  .indexSection {
    h5 {
      margin-right: 18px;
      margin-bottom: 10px;
      padding-top: 6px;
      padding-bottom: 4px;
      margin-left: 20px;
      font-size: 14px;
      min-width: 25px;
      width: 25px;
      height: 20px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;
      transition: transform 80ms ease-in-out;
    }

    h5:hover {
      box-shadow: 0 0 10px white;
      transform: scale(1.3);
    }
  }

  .infoSection {
    display: flex;
  }
`


interface PolySegmentProfileProps {
    segment: PolySegment;
    index: number;
}


const PolySegmentProfile: React.FC<PolySegmentProfileProps> = ({segment, index}) => {
    const properties = ['length', 'angle']

    return (
        <PolySegmentProfileRoot>
            <div className={"indexSection"}>
                <h5>{index}</h5>

            </div>
            <div className={"infoSection"}>
                {properties.map((property) => (
                    <ShapeInfoItem shape={segment} property={property}/>
                ))}
            </div>
        </PolySegmentProfileRoot>
    );
}


export default PolySegmentProfile;