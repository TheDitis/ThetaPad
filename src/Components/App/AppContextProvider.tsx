import useAppDimensions from "../ThetaPad/useAppDimensions";
import React from "react";
import {MAX_SIDEBAR_WIDTH, NAVBAR_HEIGHT} from "../constants";

export interface Dimensions {
    navbar: number,
    sidebar: number,
    width: number,
    height: number,
}

export const SizeContext = React.createContext<Dimensions>({
    navbar: NAVBAR_HEIGHT,
    sidebar: MAX_SIDEBAR_WIDTH,
    width: window.innerWidth,
    height: window.innerHeight,
})

const AppContextProvider: React.FC = ({children}) => {
    const dimensions = useAppDimensions();

    return (
        <SizeContext.Provider value={dimensions}>
            {children}
        </SizeContext.Provider>
    )
}


export default AppContextProvider;