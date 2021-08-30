/** ResizeListener.tsx
 * @file A null component that holds the resize-listener
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect} from "react";
import {recalculateDimensions} from "../../../redux/slices/dimensionsSlice";
import {useAppDispatch} from "../../../redux/hooks";


const ResizeListener: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const updateDimensions = (e) => {
            dispatch(recalculateDimensions({
                width: e.target.innerWidth,
                height: e.target.innerHeight,
            }));
        }

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, [dispatch]);


    return null;
}

export default ResizeListener;