import {useEffect, useState} from "react";
import {MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, NAVBAR_HEIGHT} from "../constants";
import {Point} from "./types/shapes";
import {Dimensions} from "../App/AppContextProvider";

const useAppDimensions = () => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        navbar: NAVBAR_HEIGHT,
        sidebar: MIN_SIDEBAR_WIDTH,
        width: window.innerWidth,
        height: window.innerHeight,
    })

    /**
     * ON MOUNT: add a window-resize event listener that updates dimensions
     * ON UNMOUNT: remove that event listener
     */
    useEffect(() => {
        const calculateDimensions = (width: number, height: number) => {
            let sidebarWidth = width / 3;
            sidebarWidth = Math.min(MAX_SIDEBAR_WIDTH, sidebarWidth);
            sidebarWidth = Math.max(MIN_SIDEBAR_WIDTH, sidebarWidth)
            if (sidebarWidth !== dimensions.sidebar) {
                Point.xOffset = sidebarWidth
            }
            setDimensions({
                navbar: dimensions.navbar,
                sidebar: sidebarWidth,
                width,
                height,
            })
        }

        const updateDimensions = (e) => {
            calculateDimensions(e.target.innerWidth, e.target.innerHeight);
        }

        calculateDimensions(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, [dimensions.navbar, dimensions.sidebar]);

    return dimensions;
}

export default useAppDimensions;