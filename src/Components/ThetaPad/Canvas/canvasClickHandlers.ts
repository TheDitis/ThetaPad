import {clearTempShape, TempShapeType, updateTempShape} from "../../../redux/slices/tempShapeSlice";
import store from "../../../redux/store";
import {createShape} from "../../../redux/slices/shapesSlice";
import {LineUtils} from "../../../types/shapes";

export const completeTempShape = () => {
    let tempShape: TempShapeType = store.getState().tempShape;
    if (tempShape !== null) {
        store.dispatch(createShape(tempShape));
        store.dispatch(clearTempShape());
    }
}

export const handleMouseMove = (e) => {
    const tempShape = store.getState().tempShape;
    if (tempShape) {
        store.dispatch(updateTempShape({
            end: {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY},
            length: LineUtils.length_(tempShape),
            angle: LineUtils.angle(tempShape),
        }))
    }
}