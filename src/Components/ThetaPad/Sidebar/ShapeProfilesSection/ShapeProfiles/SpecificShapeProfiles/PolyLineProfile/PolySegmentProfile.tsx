/** PolySegmentProfile.tsx
 * @file Profile row of one segment of a poly-line
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import styled from "styled-components";
import React from "react";
import {PolySegment} from "../../../../../../../types/shapes";
import ShapeInfoItem from "../../ShapeInfoItem";
import {useDispatch, useSelector} from "react-redux";
import {resetUnit, setUnit} from "../../../../../../../redux/slices/unitSlice";
import {unitSelector} from "../../../../../../../redux/selectors";


const SEGMENT_HEIGHT = 50;

interface PolySegmentProfileStyleProps {
    isUnit: boolean;
}

const PolySegmentProfileRoot = styled.div<PolySegmentProfileStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: ${SEGMENT_HEIGHT}px;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  
  .indexSection {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    height: ${SEGMENT_HEIGHT / 2}px;
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
  
  .nodesSection {
    position: relative;
    z-index: 500;
    
    .nodesSvg {
      line {
        z-index: 10;
      }
      circle {
        z-index: 8;
      }
    }
  }
`


interface PolySegmentProfileProps {
    segment: PolySegment;
    index: number;
    shapeId: string;
}


const PolySegmentProfile: React.FC<PolySegmentProfileProps> = ({segment, index, shapeId}) => {
    const {unit, unitShape} = useSelector(unitSelector);
    const dispatch = useDispatch();
    const properties = ['length', 'angle'];
    const isUnit = unitShape === shapeId && unit === segment.length;
    const isEven = index % 2 === 0;
    const xOffset = isEven ? 10 : -10;

    const onSelect = () => {
        if (isUnit) {
            dispatch(resetUnit());
        }
        else {
            dispatch(setUnit({id: shapeId, value: segment.length}))
        }
    }

    console.log()
    return (
        <PolySegmentProfileRoot isUnit={isUnit}>
            <div className={"indexSection"} onClick={onSelect}>
                <h5>{index}</h5>
            </div>
            <div className={"infoSection"}>
                {properties.map((property) => (
                    <ShapeInfoItem shape={segment} property={property}/>
                ))}
            </div>
            <div className={"nodesSection"}>

                <svg className={"nodesSvg"} height={SEGMENT_HEIGHT * 2} width={SEGMENT_HEIGHT * 2}>
                    {isEven
                        ? <line x1={SEGMENT_HEIGHT + xOffset} y1={25} x2={SEGMENT_HEIGHT - xOffset} y2={SEGMENT_HEIGHT * 1.5} stroke={"black"} strokeWidth={2}/>
                        : <line/>
                    }
                    {index === 0 && (
                        <circle cx={SEGMENT_HEIGHT + xOffset} cy={25} r={10} fill={"white"} stroke={"black"} strokeWidth={4}/>
                    )}
                    <circle cx={SEGMENT_HEIGHT - xOffset} cy={SEGMENT_HEIGHT * 1.5} r={10} fill={"white"} stroke={"black"} strokeWidth={4}/>
                </svg>
            </div>
        </PolySegmentProfileRoot>
    );
}


export default PolySegmentProfile;