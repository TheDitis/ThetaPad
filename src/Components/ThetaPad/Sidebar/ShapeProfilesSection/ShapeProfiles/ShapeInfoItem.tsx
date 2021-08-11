/** ShapeInfoItem.tsx
 * @file A single piece of information shown in ShapeProfileBase. An icon/value pair
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useContext} from "react";
import styled from "styled-components";
import LengthIcon from "../../../../Icons/LengthIcon";
import AngleIcon from "../../../../Icons/AngleIcon";
import {Shape} from "../../../types/shapes";
import RadiusIcon from "../../../../Icons/RadiusIcon";
import {useSelector} from "react-redux";
import {unitValSelector} from "../../../../../redux/selectors";

// The icon to display for each property
const iconMap = {
    length: LengthIcon,
    totalLength: LengthIcon,
    angle: AngleIcon,
    averageAngle: AngleIcon,
    radius: RadiusIcon,
    diameter: null,
}

// The value character that should be displayed for each property
const unitMap = {
    length: '',
    totalLength: '',
    averageAngle: '°',
    angle: '°',
    radius: '',
    diameter: '',
}

interface ShapeInfoItemStyleProps {

}

const ShapeInfoItemRoot = styled.div<ShapeInfoItemStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  margin-right: 10px;
  padding: 0;

  .valueContainer {
    background-color: white;
    width: 55px;
    border-radius: 5px;
    margin-left: 8px;
    float: bottom;
    font-size: 10pt;
    padding: 0;
    //padding-top: 2px;
  }
`


interface ShapeInfoItemProps {
    shape: Shape;
    property: string;
    value?: number;
}

/**
 * Theses are the individual info items in ShapeProfiles as an icon/value pair
 * @param {Shape} shape - the shape you're getting info from
 * @param {string} property - the property of 'shape' you are interested in
 * @param {number} [value] - optional pre-calculated value for this property
 */
const ShapeInfoItem: React.FC<ShapeInfoItemProps> = ({shape, property, value}) => {
    const unit = useSelector(unitValSelector);

    /** @return {string} - A readable representation of shape[property] */
    const getFormattedValue = (): string => {

        let val = value === undefined ? shape[property] : value;
        if (['length', 'totalLength', 'radius', 'diameter'].includes(property)) {
            val = val / unit;
            return val.toFixed(unit === 1 ? 0 : 2)
        }
        return val.toFixed(1);
    }

    const Icon = iconMap[property];
    const val = getFormattedValue();
    const unitChar = unitMap[property];

    return (
        <ShapeInfoItemRoot>
            <Icon size={0.21}/>
            <div className={"valueContainer"}>
                <p className={"value"}>{val}{unitChar}</p>
            </div>
        </ShapeInfoItemRoot>
    )
}

export default ShapeInfoItem;