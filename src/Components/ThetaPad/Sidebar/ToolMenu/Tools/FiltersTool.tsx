/** FiltersTool.tsx
 * @file Tool profile with controls for image filtering
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ToolProfileBase from "../ToolProfileBase";
import {useAppSelector} from "../../../../../redux/hooks";
import {filtersSelector} from "../../../../../redux/selectors";


const FiltersTool: React.FC = () => {
    const {active, ...filters} = useAppSelector(filtersSelector);

    return (
        <ToolProfileBase active={active}>

        </ToolProfileBase>
    )
}


export default FiltersTool;