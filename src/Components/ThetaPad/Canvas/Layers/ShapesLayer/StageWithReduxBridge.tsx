import {Provider, ReactReduxContext} from "react-redux";
import {Stage} from "react-konva";
import React from "react";


interface StageWithReduxBridgeProps {
    width: number;
    height: number;
}

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