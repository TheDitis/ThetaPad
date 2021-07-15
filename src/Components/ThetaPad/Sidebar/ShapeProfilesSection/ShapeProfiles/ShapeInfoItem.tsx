/** ShapeInfoItem.tsx
 * @file A single piece of information shown in ShapeProfileBase. An icon/value pair
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useContext} from "react";
import styled from "styled-components";
import LengthIcon from "../../../../Icons/LengthIcon";
import AngleIcon from "../../../../Icons/AngleIcon";
import {Shape} from "../../../types/shapes";
import {UnitContext} from "../../../ThetaPad";

// The icon to display for each property
const iconMap = {
    length: LengthIcon,
    totalLength: LengthIcon,
    angle: AngleIcon,
    averageAngle: AngleIcon,
    radius: null,
    diameter: null,
}

// The unit character that should be displayed for each property
const unitMap = {
    length: '',
    totalLength: '',
    averageAngle: '',
    angle: '°',
    radius: '',
    diameter: '',
}

interface ShapeInfoItemStyleProps {

}

const ShapeInfoItemRoot = styled.div<ShapeInfoItemStyleProps>`
  display: flex;
  height: 100%; 
  margin-right: 10px;
  
  .valueContainer {
      background-color: white;
      width: 45px;
      border-radius: 5px;
      margin: 8px;
      float: bottom;
      padding: 0;
      padding-top: 2px;
    }
`


interface ShapeInfoItemProps {
    shape: Shape;
    property: string;
}

/**
 * Theses are the individual info items in ShapeProfiles as an icon/value pair
 * @param {Shape} shape - the shape you're getting info from
 * @param {string} property - the property of 'shape' you are interested in
 */
const ShapeInfoItem: React.FC<ShapeInfoItemProps> = ({shape, property}) => {
    const unit = useContext(UnitContext)

    /** @return {string} - A readable representation of shape[property] */
    const getFormattedValue = (): string => {
        let value = shape[property];
        if (['length', 'totalLength', 'radius', 'diameter'].includes(property)) {
            value = value / unit;
            return value.toFixed(unit === 1 ? 0 : 2)
        }
        return value.toFixed(1);
    }

    const Icon = iconMap[property];
    const value = getFormattedValue();
    const unitChar = unitMap[property];

    return (
        <ShapeInfoItemRoot>
            <Icon size={0.23}/>
            <div className={"valueContainer"}>
                <p className={"value"}>{value}{unitChar}</p>
            </div>
        </ShapeInfoItemRoot>
    )
}

export default ShapeInfoItem;