/** PolySegmentProfile.tsx
 * @file Profile row of one segment of a poly-line
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {PolySegment} from "../../../../../../../types/shapes";
import ShapeInfoItem from "../../ShapeInfoItem";
import {resetUnit, setUnit} from "../../../../../../../redux/slices/unitSlice";
import {unitSelector} from "../../../../../../../redux/selectors";
import {POLY_SEGMENT_HEIGHT} from "../../../../../../../constants";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";


interface PolySegmentProfileStyleProps {
    isUnit: boolean;
}

const PolySegmentProfileRoot = styled.div<PolySegmentProfileStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: ${POLY_SEGMENT_HEIGHT}px;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  
  .indexSection {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    height: ${POLY_SEGMENT_HEIGHT / 2}px;
    width: 25px;
    background: ${props => props.isUnit ? 'white' : 'rgba(0, 0, 0, 0.2)'};
    box-shadow: ${props => props.isUnit ? "0 0 10px white" : "none"};
    
    h5 {
      font-size: 14px;
      min-width: 25px;
      transition: transform 80ms ease-in-out;
    }

    &:hover {
      box-shadow: 0 0 10px white;
      transform: scale(1.3);
    }
  }

  .infoSection {
    display: flex;
  }
  
  .nodesSpacer {
    //width: 20px;
  }
`


interface PolySegmentProfileProps {
    segment: PolySegment;
    index: number;
    shapeId: string;
}


const PolySegmentProfile: React.FC<PolySegmentProfileProps> = ({segment, index, shapeId}) => {
    const {unit, unitShape} = useAppSelector(unitSelector);
    const dispatch = useAppDispatch();
    const isUnit = unitShape === shapeId && unit === segment.length;


    const onSelect = () => {
        if (isUnit) {
            dispatch(resetUnit());
        }
        else {
            dispatch(setUnit({id: shapeId, value: segment.length}))
        }
    }

    return (
        <PolySegmentProfileRoot isUnit={isUnit}>
            <div className={"indexSection"} onClick={onSelect}>
                <h5>{index}</h5>
            </div>
            <div className={"infoSection"}>
                <ShapeInfoItem shape={segment} property={'length'}/>
                {segment.angle && (
                    <div style={{position: "relative", top: POLY_SEGMENT_HEIGHT / 2}}>
                        <ShapeInfoItem
                            shape={segment}
                            property={'angle'}
                            style={{border: "2px solid rgba(0, 0, 0, 0.4)"}}
                            noIcon
                        />
                    </div>
                )}
            </div>
            <div className={"nodesSpacer"}/>
        </PolySegmentProfileRoot>
    );
}


export default PolySegmentProfile;
