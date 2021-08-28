/** ResizeListener.tsx
 * @file A null component that holds the resize-listener
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {recalculateDimensions} from "../../../redux/slices/dimensionsSlice";
import {imageSelector} from "../../../redux/selectors";


const ResizeListener: React.FC = () => {
    const dispatch = useDispatch();
    const image = useSelector(imageSelector)

    useEffect(() => {
        const updateDimensions = (e) => {
            dispatch(recalculateDimensions({
                width: e.target.innerWidth,
                height: e.target.innerHeight,
            }))
        }

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        }
    }, [dispatch, image]);


    return null;
}

export default ResizeListener;