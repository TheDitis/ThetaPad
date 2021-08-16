/** KonvaStageWithReduxBridge.tsx
 * @file Konva Stage hijacks context, this component fixes that so we can still
 *      access Redux context
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Provider, ReactReduxContext} from "react-redux";
import {Stage} from "react-konva";
import React from "react";


interface StageWithReduxBridgeProps {
    width: number;
    height: number;
}

/**
 * Wraps Konva Stage component, passing Redux context across its barrier.
 * @param {number} width - width of the stage
 * @param {number} height - height of the stage
 * @return {JSX.Element} - Konva Stage with nested Redux Provider which wraps
 *      any children of this component
 */
const KonvaStageWithReduxBridge: React.FC<StageWithReduxBridgeProps> = (
    {width, height, children}
) => {
    return (
        <ReactReduxContext.Consumer>
            {({store}) => (
                <Stage width={width} height={height}>
                    <Provider store={store}>
                        {children}
                    </Provider>
                </Stage>
            )}
        </ReactReduxContext.Consumer>
    )
}


export default KonvaStageWithReduxBridge;