/** StageWithReduxBridge.tsx
 * @file Konva stage hijacks Redux context. This wrapper prevents that
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
 * Konva stage hijacks Redux context. This wrapper prevents that
 * @param {number} width - width of the stage
 * @param {number} height - height of the stage
 * @param children - all child elements
 * @return {JSX.Element} - all chiled elements, wrapped in a Konva Stage with
 *      Redux context maintained
 */
const StageWithReduxBridge: React.FC<StageWithReduxBridgeProps> = (
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


export default StageWithReduxBridge;