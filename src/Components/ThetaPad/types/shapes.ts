
export type ShapeMap = { [id: string]: ShapeType}

// Subtypes of shape
export enum ShapeKind {
    Line = "Line",
    Poly = "Poly",
    Circle = "Circle",
}

//export const ShapeKindOptions: {[label: string]: ShapeKind} = {
//    LineType: ShapeKind.LineType,
//    PolyType: ShapeKind.PolyType,
//    CircleType: ShapeKind.CircleType,
//}

/** Represents a 2D point */
export interface Point {
    x: number;
    y: number;
}

//namespace PointManipulation {
//    export const translate = (pt: Point, x: number, y: number) => {
//        pt.x += x;
//        pt.y += y;
//    }
//
//    export const translated = (pt: Point, x: number, y: number): Point => {
//        return {x: pt.x + x, y: pt.y + y};
//    }
//}

const newShapeBase = (
    x: number,
    y: number,
    kind: ShapeKind,
    color: string = "black"
): ShapeType => ({
    id: Date.now().toString(),
    kind,
    origin: {x, y},
    color
})



/** Base for all shape types */
export interface ShapeType {
    id: string;
    kind: ShapeKind;
    origin: Point;
    color: string;
}

export class Line {
    static new(x: number, y: number): LineType;
    static new(x: number, y: number, x2?: number, y2?: number): LineType;
    static new(
        x: number,
        y: number,
        x2?: number,
        y2?: number,
        color: string = "black"
    ): LineType {
        const base = newShapeBase(x, y, ShapeKind.Line, color);
        const end = (x2 && y2) ? {x: x2, y: y2} : base.origin;
        return {
            ...base,
            start: base.origin,
            end,
        }
    }
}

/** Represents a 2D line segment */
export interface LineType extends ShapeType {
    start: Point;
    end: Point;
}

/** represents a line path with more than 2 points */
export interface PolyType extends ShapeType {
    points: Point[];
}

/** represents a circle */
export interface CircleType extends ShapeType {
    r: number;
}