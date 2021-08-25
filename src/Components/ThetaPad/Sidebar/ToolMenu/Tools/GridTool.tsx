/** GridTool.tsx
 * @file Tool for adding a grid over images
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React from "react";
import ToolProfileBase from "../ToolProfileBase";


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
            <h1>grid</h1>
        </>
    )
}