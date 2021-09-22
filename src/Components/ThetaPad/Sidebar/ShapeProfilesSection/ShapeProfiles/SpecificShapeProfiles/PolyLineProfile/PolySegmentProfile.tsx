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
import {useAppDispatch, useAppSelector} from "../../../../../../../hooks/reduxHooks";
import {
    clearHighlight,
    highlightPoint,
    highlightPolySegmentLength
} from "../../../../../../../redux/slices/highlightSlice";


interface PolySegmentProfileStyleProps {
    isUnit: boolean;
    shapeIsUnit: boolean;
}

const PolySegmentProfileRoot = styled.div<PolySegmentProfileStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: ${POLY_SEGMENT_HEIGHT}px;
  min-height: ${POLY_SEGMENT_HEIGHT}px;
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
    transition-duration: 0.3s;
    
    h5 {
      font-size: 14px;
      min-width: 25px;
      transition: transform 80ms ease-in-out;
      color: ${({shapeIsUnit, isUnit}) => isUnit || !shapeIsUnit ? "black" : "white"}
    }

    &:hover {
      box-shadow: 0 0 10px white;
      transform: scale(1.15);
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

/**
 * Profile for an individual segment of a poly-line
 * @param {PolySegment} segment - poly-segment to profile
 * @param {number} index - index of the segment in the poly shape
 * @param {string} shapeId - id of the poly shape this segment originates from
 * @return {JSX.Element} - row with info and a selection button for the segment
 */
const PolySegmentProfile: React.FC<PolySegmentProfileProps> = ({segment, index, shapeId}) => {
    const {unit, unitShape} = useAppSelector(unitSelector);
    const dispatch = useAppDispatch();
    const shapeIsUnit = unitShape === shapeId;
    const isUnit = shapeIsUnit && unit === segment.length;

    const onSelect = () => {
        if (isUnit) {
            dispatch(resetUnit());
        }
        else {
            dispatch(setUnit({id: shapeId, value: segment.length, subItem: index}))
        }
    }

    const highlightSegment = () => {
        dispatch(
            highlightPolySegmentLength({
                shapeId: shapeId,
                subItemIndex: index,
            })
        )
    }

    return (
        <PolySegmentProfileRoot isUnit={isUnit} shapeIsUnit={shapeIsUnit}>
            <div
                className={"indexSection"}
                onClick={onSelect}
                onMouseEnter={highlightSegment}
                onMouseLeave={() => dispatch(clearHighlight())}
            >
                <h5>{index}</h5>
            </div>
            <div className={"infoSection"}>
                <ShapeInfoItem
                    shape={segment}
                    property={'length'}
                    shapeId={shapeId}
                    subItem={index}
                />
                <div style={{position: "relative", top: POLY_SEGMENT_HEIGHT / 2}}>
                    {segment.pointAngle !== undefined ? (
                        <ShapeInfoItem
                            shape={segment}
                            property={'pointAngle'}
                            shapeId={shapeId}
                            style={{border: "2px solid rgba(0, 0, 0, 0.4)"}}
                            noIcon
                            onMouseEnter={() => {
                                dispatch(highlightPoint({
                                    shapeId: shapeId,
                                    subItemIndex: index + 1,
                                }))
                            }}
                            onMouseLeave={() => {
                                dispatch(clearHighlight());
                            }}
                        />
                    ) : (
                        <div style={{width: 65}}/>
                    )}
                </div>
                {/*<ShapeInfoItem shape={segment} property={'angle'} shapeId={shapeId}/>*/}
            </div>
            <div className={"nodesSpacer"}/>
        </PolySegmentProfileRoot>
    );
}


export default React.memo(
    PolySegmentProfile,
    (p, n) => {
        return (
            p.index === n.index
            && p.segment.length === n.segment.length
            && p.segment.pointAngle === n.segment.pointAngle
        )
    }
);
