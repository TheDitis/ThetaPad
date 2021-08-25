/** GridTool.tsx
 * @file Tool for adding a grid over images
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ToolProfileBase from "../ToolProfileBase";
import {Button} from "@material-ui/core";
import GridIcon from "../../../../Icons/GridIcon";


const GridTool: React.FC = () => {
    return (
        <ToolProfileBase
            MainContent={GridTooMain}
        />
    )
}


export default GridTool;


const GridTooMain = () => {

    return (
        <>
            <Button
            >
                <GridIcon color={"black"}/>
            </Button>
        </>
    )
}