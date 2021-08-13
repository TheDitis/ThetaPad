import {useDispatch, useSelector} from "react-redux";
import {tempShapeSelector} from "../../redux/selectors";
import {useEffect} from "react";
import {ShapeUtils} from "../../types/shapes";
import {createShape, removePolyPoint} from "../../redux/slices/shapesSlice";
import {shapeIsValid} from "../ThetaPad/Canvas/canvasEventHandlers";
import {clearTempShape} from "../../redux/slices/tempShapeSlice";


const useThetaPadKeyListeners = () => {
    const dispatch = useDispatch();
    const tempShape = useSelector(tempShapeSelector);

    useEffect(() => {
        const handleKeyEvent = (e) => {
            console.log("key pressed: ", e.key.toLowerCase());
            switch (e.key.toLowerCase()) {
                case "escape":
                    if (tempShape !== null && ShapeUtils.isPoly(tempShape)) {
//                        moveTempShapeToShapes();
                        if (shapeIsValid(tempShape)) {
                            let shape = tempShape;
                            if (ShapeUtils.isPoly(tempShape)) {
                                shape = {...tempShape};
                                shape.points.splice(shape.points.length - 1, 1)
                            }
                            dispatch(createShape(shape));
                        }
                        dispatch(removePolyPoint({
                            target: tempShape.id,
                            index: tempShape.points.length
                        }))
                    }
                    dispatch(clearTempShape())
            }
        }

        window.addEventListener("keydown", handleKeyEvent);

        return () => {
            window.removeEventListener("keydown", handleKeyEvent);
        }
    }, [dispatch, tempShape]);

}

export default useThetaPadKeyListeners;