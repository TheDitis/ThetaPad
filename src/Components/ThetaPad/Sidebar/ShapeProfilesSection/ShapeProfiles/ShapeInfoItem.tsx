/** ShapeInfoItem.tsx
 * @file A single piece of information shown in ShapeProfileBase. An icon/value pair
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import styled from "styled-components";
import LengthIcon from "../../../../Icons/LengthIcon";
import AngleIcon from "../../../../Icons/AngleIcon";
import {PolySegment, Shape, ShapeUtils} from "../../../../../types/shapes";
import RadiusIcon from "../../../../Icons/RadiusIcon";
import {unitSelector} from "../../../../../redux/selectors";
import {formatLengthText} from "../../../../../utils/utils";
import {useAppDispatch, useAppSelector} from "../../../../../redux/hooks";
import {resetUnit, setUnit} from "../../../../../redux/slices/unitSlice";

// The icon to display for each property
const iconMap = {
    length: LengthIcon,
    totalLength: LengthIcon,
    angle: AngleIcon,
    pointAngle: AngleIcon,
    averageAngle: AngleIcon,
    radius: RadiusIcon,
    r: RadiusIcon,
    diameter: null,
}

// The value character that should be displayed for measurement type
const unitMap = {
    length: '',
    angle: '°',
    other: '',
}

interface ShapeInfoItemStyleProps {
    isUnit: boolean;
}

const ShapeInfoItemRoot = styled.div<ShapeInfoItemStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  margin-right: 10px;
  padding: 0;
  
  &:hover {
    transform: scale(1.05);
  }

  .valueContainer {
    background-color: white;
    width: 55px;
    border-radius: 5px;
    margin-left: 8px;
    float: bottom;
    font-size: 10pt;
    padding: 2px 0;

    box-shadow: 0 0 10px ${({isUnit}) => (isUnit ? "rgba(255, 255, 255, 1)" : "transparent")};
  }
`

type MeasurementCategoryType = 'length' | 'angle' | 'other';

/**
 * Narrows down the given property name to its measurement category
 * @param {string} property - property name
 * @return {MeasurementCategoryType} - category of the passed property
 */
const getMeasurementType = (property: string): MeasurementCategoryType => {
    if (['length', 'totalLength', 'radius', 'r', 'diameter'].includes(property)) {
        return 'length';
    }
    else if (['angle', 'pointAngle', 'averageAngle']) {
        return 'angle';
    }
    else return 'other'
}


interface ShapeInfoItemProps {
    shape: Shape | PolySegment;
    property: string;
    value?: number;
    shapeId?: string;
    noIcon?: boolean;
    style?: React.CSSProperties;
}

/**
 * Theses are the individual info items in ShapeProfiles as an icon/value pair
 * @param {Shape | PolySegment} shape - the shape you're getting info from
 * @param {string} property - the property of 'shape' you are interested in
 * @param {number} [value] - optional pre-calculated value for this property
 * @param {string} [shapeId=null] - include shape that a PolySegment originates from
 * @param {boolean} [noIcon=false] - if true, the icon will not be rendered
 * @param {React.CSSProperties} style - any extra styles to apply
 */
const ShapeInfoItem: React.FC<ShapeInfoItemProps> = (
    {
        shape,
        property,
        value,
        shapeId = null,
        noIcon = false,
        style = {}
    }
) => {
    const dispatch = useAppDispatch();
    const {unit, unitShape} = useAppSelector(unitSelector);
    value = value || shape[property];
    const type: MeasurementCategoryType = getMeasurementType(property);

    if (ShapeUtils.isShape(shape)) {
        shapeId = shape.id
    }
    else if (!shapeId) {
        console.error(
            "shapeId must be passed to ShapeInfoItem if shape is a PolySegment"
        )
    }

    /** @return {string} - A readable representation of shape[property] */
    const getFormattedValue = (): string => {
        if (type === 'length') {
            return formatLengthText(value as number / unit, unit !== 1)
        }
        return (value as number).toFixed(1);
    }

    const Icon = !noIcon ? iconMap[property] : () => null;
    const val = getFormattedValue();
    const isUnit = unitShape === shapeId && shape[property] === unit;
    const unitChar = unitMap[type];

    /** sets/resets the unit to/from this item's value */
    const toggleUnit = () => {
        if (type === 'length') {
            if (isUnit) {
                dispatch(resetUnit());
            } else {
                dispatch(setUnit({id: shapeId, value: value as number}))
            }
        }
    }

    return (
        <ShapeInfoItemRoot
            onClick={toggleUnit}
            isUnit={isUnit}
        >
            <Icon size={0.21}/>
            <div className={"valueContainer"} style={style}>
                <p className={"value"}>{val}{unitChar}</p>
            </div>
        </ShapeInfoItemRoot>
    )
}

export default ShapeInfoItem;