
export type ShapeMap = { [id: string]: Shape}

// Subtypes of shape
export enum ShapeKind {
    Line = "Line",
    Poly = "Poly",
    Circle = "Circle",
}

//export const ShapeKindOptions: {[label: string]: ShapeKind} = {
//    Line: ShapeKind.Line,
//    Poly: ShapeKind.Poly,
//    Circle: ShapeKind.Circle,
//}

/** Represents a 2D point */
export interface Point {
    x: number;
    y: number;
}


export abstract class PointUtils {
    static distance = (pt1: Point, pt2: Point): number => {
        const yDist = Math.abs(pt1.y - pt2.y);
        const xDist = Math.abs(pt1.x - pt2.x);
        return Math.sqrt((yDist ** 2) + (xDist ** 2))
    }

    static angle = (pt1: Point, pt2: Point): number => (
        Math.atan2(
            pt2.y - pt1.y,
            pt2.x - pt1.x
        ) * 180 / Math.PI
    )
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
): Shape => ({
    id: Date.now().toString(),
    kind,
    origin: {x, y},
    color
})

/** Base for all shape types */
export interface Shape {
    id: string;
    kind: ShapeKind;
    origin: Point;
    color: string;
}

export abstract class LineUtils {
    static new(x: number, y: number): Line;
    static new(x: number, y: number, x2?: number, y2?: number): Line;
    static new(
        x: number,
        y: number,
        x2?: number,
        y2?: number,
        color: string = "black"
    ): Line {
        const base = newShapeBase(x, y, ShapeKind.Line, color);
        const end = (x2 && y2) ? {x: x2, y: y2} : base.origin;
        return {
            ...base,
            start: base.origin,
            end,
        }
    }

    static points(line: Line): number[] {
        return [
            line.start.x, line.start.y,
            line.end.x, line.end.y
        ]
    }

    static pointsTranslated(line: Line, xAmt: number = 0, yAmt: number = 0) {
        return [
            line.start.x + xAmt, line.start.y + yAmt,
            line.end.x + xAmt, line.end.y + yAmt
        ]
    }

    static length_(line: Line): number {
        return PointUtils.distance(line.start, line.end)
    }

    static angle(line: Line): number {
        return PointUtils.angle(line.start, line.end)
    }
}

/** Represents a 2D line segment */
export interface Line extends Shape {
    start: Point;
    end: Point;
}

/** represents a line path with more than 2 points */
export interface Poly extends Shape {
    points: Point[];
}

/** represents a circle */
export interface Circle extends Shape {
    r: number;
}