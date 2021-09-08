/** ResizeListener.tsx
 * @file A shell component that holds the resize-listener
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect} from "react";
import {recalculateDimensions} from "../../../redux/slices/dimensionsSlice";
import {useAppDispatch} from "../../../hooks/reduxHooks";

/**
 * A shell component to hold resize event listeners
 * @return {null}
 */
const ResizeListener: React.FC = () => {
    const dispatch = useAppDispatch();

    /** Add window resize listener to update dimensions */
    useEffect(() => {
        const updateDimensions = (e) => {
            dispatch(recalculateDimensions({
                width: e.target.innerWidth,
                height: e.target.innerHeight,
            }));
        }

        // Calculate on mount
        dispatch(recalculateDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        }));

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, [dispatch]);


    return null;
}

export default ResizeListener;