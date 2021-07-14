import {useEffect, useState} from "react";
import {MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH} from "../constants";
import {Point} from "./types/shapes";
import {Dimensions} from "./ThetaPad";

const useAppDimensions = () => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        sidebar: MIN_SIDEBAR_WIDTH,
        width: window.innerWidth,
        height: window.innerHeight,
    })

    /**
     * ON MOUNT: add a window-resize event listener that updates dimensions
     * ON UNMOUNT: remove that event listener
     */
    useEffect(() => {
        const updateDimensions = (e) => {
            let sidebarWidth = e.target.innerWidth / 3;
            sidebarWidth = Math.min(MAX_SIDEBAR_WIDTH, sidebarWidth);
            sidebarWidth = Math.max(MIN_SIDEBAR_WIDTH, sidebarWidth)
            if (sidebarWidth !== dimensions.sidebar) {
                Point.xOffset = sidebarWidth
            }
            console.log(e)
            setDimensions({
                sidebar: sidebarWidth,
                width: e.target.innerWidth,
                height: e.target.innerHeight,
            })
        }

        window.addEventListener('resize', updateDimensions)

        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, [dimensions.sidebar]);

    return dimensions
}

export default useAppDimensions;