/** ShapeInfoItem.tsx
 * @file A single piece of information shown in ShapeProfile. An icon/value pair
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useContext} from "react";
import styled from "styled-components";
import LengthIcon from "../../../../Icons/LengthIcon";
import AngleIcon from "../../../../Icons/AngleIcon";
import {Shape} from "../../../types/shapes";
import {UnitContext} from "../../../ThetaPad";

const iconMap = {
    length: LengthIcon,
    angle: AngleIcon,
    radius: null,
    diameter: null,
}

const unitMap = {
    length: '',
    angle: '°',
    radius: '',
    diameter: '',
}

interface ShapeInfoItemStyleProps {

}

const ShapeInfoItemRoot = styled.div<ShapeInfoItemStyleProps>`
  display: flex;
  height: 100%; 
  
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

const ShapeInfoItem: React.FC<ShapeInfoItemProps> = ({shape, property}) => {
//    const unit = useContext(UnitContext)

//    const getFormattedValue = (): string => {
//        let value = shape[property];
//        if (['length', 'totalLength', 'radius', 'diameter'].includes(property)) {
//            value = value / unit;
//            return value.toFixed(unit === 1 ? 0 : 2)
//        }
//        return value.toFixed(1);
//    }

    const Icon = iconMap[property];
//    const value = getFormattedValue();
    const value = shape[property];
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