import {randomColor, sum} from "../utils";
import _ from "lodash";

export type ShapeMap = { [id: string]: Shape }

// Subtypes of shape
export enum ShapeKind {
    Line = "Line",
    Poly = "Poly",
    Circle = "Circle",
}



/** Represents a 2D point */
export interface Point {
    x: number;
    y: number;
}


export abstract class PointUtils {
    static new(x: number, y: number): Point {
        return {x, y}
    }

    static distance = (pt1: Point, pt2: Point): number => {
        const yDist = Math.abs(pt1.y - pt2.y);
        const xDist = Math.abs(pt1.x - pt2.x);
        return Math.sqrt((yDist ** 2) + (xDist ** 2));
    }

    static angle = (pt1: Point, pt2: Point): number => (
        Math.atan2(
            pt2.y - pt1.y,
            pt2.x - pt1.x
        ) * 180 / Math.PI
    )

    static isPoint = (pt: any): pt is Point => {
        const keys = Object.keys(pt);
        return keys.length === 2 && keys.includes('x') && keys.includes('y');
    }

    static copy = (pt: Point): Point => ({x: pt.x, y: pt.y})
}



/** Base for all shape types */
export interface Shape {
    id: string;
    kind: ShapeKind;
    origin: Point;
    color: string;
}

export abstract class ShapeUtils {
    static isLine(shape: Shape): shape is Line {
        return shape.kind === ShapeKind.Line;
    }

    static isPoly(shape: Shape): shape is Poly {
        return shape.kind === ShapeKind.Poly;
    }

    static isCircle(shape: Shape): shape is Circle {
        return shape.kind === ShapeKind.Circle;
    }

    static newShapeTemplate = (
        x: number,
        y: number,
        kind: ShapeKind,
        color?: string
    ) => {
        if (color === undefined) color = randomColor();
        return {
            id: Date.now().toString(),
            kind,
            origin: {x, y},
            color
        }
    }
}



/** Represents a 2D line segment */
export interface Line extends Shape {
    start: Point;
    end: Point;
    length: number;
    angle: number;
}

/** Utility class for Line Shapes */
export abstract class LineUtils {
    static new(x: number, y: number): Line;
    static new(x: number, y: number, x2?: number, y2?: number): Line;
    static new(
        x: number,
        y: number,
        x2?: number,
        y2?: number,
        color?: string
    ): Line {
        const base = ShapeUtils.newShapeTemplate(x, y, ShapeKind.Line, color);

        let end = base.origin;
        let length = 0;
        let angle = 0;

        if (x2 && y2) {
            end = {x: x2, y: y2}
            length = PointUtils.distance(base.origin, end);
            angle = PointUtils.angle(base.origin, end);
        }

        return {
            ...base,
            start: base.origin,
            end,
            length,
            angle,
        }
    }

    static points(line: Line): number[] {
        return [
            line.start.x, line.start.y,
            line.end.x, line.end.y
        ]
    }

    static length_(line: Line): number {
        return PointUtils.distance(line.start, line.end)
    }

    static angle(line: Line): number {
        return PointUtils.angle(line.start, line.end)
    }
}



/** represents a line path with more than 2 points */
export interface Poly extends Shape {
    points: Point[];
    lengths: number[];
    totalLength: number;
    angles: number[];
}

export abstract class PolyUtils {
    static new(points: Point | Point[], color?: string): Poly {
        if (PointUtils.isPoint(points)) points = [points];
        if (points.length === 1) points.push({...points[0]})

        const lengths = PolyUtils.calcLengths(points);
        const angles = PolyUtils.calcAngles(points);


        const base = ShapeUtils.newShapeTemplate(
            points[0].x, points[0].y,
            ShapeKind.Poly,
            color
        )

        return {
            ...base,
            points,
            lengths,
            totalLength: sum(lengths),
            angles
        }
    }

    static points(poly: Poly): number[] {
        return _.flatMap(poly.points, (pt) => {
            return [pt.x, pt.y];
        })
    }

    static calcLengths = (points: Point[]): number[] => (
        points.reduce((acc: number[], pt: Point, i: number, arr: Point[]) => {
            if (i < arr.length - 1) {
                acc.push(PointUtils.distance(pt, arr[i + 1]))
            }
            return acc;
        }, [])
    )

    static calcAngles = (points: Point[]): number[] => (
        points.reduce((acc: number[], pt: Point, i: number, arr: Point[]) => {
            console.error("HERE")
            if (i < arr.length - 1) {
                acc.push(PointUtils.angle(pt, arr[i + i]));
            }
            return acc;
        }, [])
    )
}



/** represents a circle */
export interface Circle extends Shape {
    r: number;
}

export abstract class CircleUtils {
    static new(center: Point, color?: string): Circle {
        const base = ShapeUtils.newShapeTemplate(
            center.x, center.y,
            ShapeKind.Circle,
            color
        );
        return {
            ...base,
            r: 0
        }
    }
}