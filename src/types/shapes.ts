import {randomColor, sum} from "../utils";
import _ from "lodash";



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

/**
 * Holds useful utility functions for creating and measuring relationships
 * between points
 */
export abstract class PointUtils {
    /**
     * Creates a new point object
     * @param {number} x - x coordinate of the new point
     * @param {number} y - y coordinate of the new point
     * @return {Point} - the new Point object
     */
    static new(x: number, y: number): Point {
        return {x, y}
    }

    /**
     * Calculates absolute distance between 2 points
     * @param {Point} pt1 - one of the 2 points
     * @param {Point} pt2 - the other of the 2 points
     * @return {number} - the absolute distance between the two given points
     */
    static distance = (pt1: Point, pt2: Point): number => {
        const yDist = Math.abs(pt1.y - pt2.y);
        const xDist = Math.abs(pt1.x - pt2.x);
        return Math.sqrt((yDist ** 2) + (xDist ** 2));
    }

    /**
     * Calculates the angle in degrees between 2 points
     * @param {Point} pt1 - one of the 2 points
     * @param {Point} pt2 - the other of the 2 points
     * @return {number} - the angle (in degrees) between the 2 given points
     */
    static angle = (pt1: Point, pt2: Point): number => (
        Math.atan2(
            pt2.y - pt1.y,
            pt2.x - pt1.x
        ) * 180 / Math.PI
    )

    /**
     * Check if the given item is a point object
     * @param obj - the object you want to check
     * @return {obj is Point} - whether or not 'obj' is a Point object
     */
    static isPoint = (obj: any): obj is Point => {
        const keys = Object.keys(obj);
        return keys.length === 2 && keys.includes('x') && keys.includes('y');
    }

    /**
     * Creates a copy of a given point
     * @param {Point} pt - the point you want a copy of
     * @return {Point} - new Point object
     */
    static copy = (pt: Point): Point => ({x: pt.x, y: pt.y})
}



/** Base for all shape types */
export interface Shape {
    id: string;
    kind: ShapeKind;
    origin: Point;
    color: string;
}

/** Holds useful utility functions for creating and identifying shapes */
export abstract class ShapeUtils {
    /** Checks if given shape is a Line */
    static isLine(shape: Shape): shape is Line {
        return shape.kind === ShapeKind.Line;
    }

    /** Checks if given shape is a Poly */
    static isPoly(shape: Shape): shape is Poly {
        return shape.kind === ShapeKind.Poly;
    }

    /** Checks if given shape is a Circle */
    static isCircle(shape: Shape): shape is Circle {
        return shape.kind === ShapeKind.Circle;
    }

    /**
     * Creates a new shape base object with an id, origin, kind, and color. This
     * is only meant to create a base for subtypes of Shape (Line, Poly, and
     * Circle)
     * @param {number} x - x coordinate of the origin
     * @param {number} y - y coordinate of the origin
     * @param {ShapeKind} kind - the type of shape (subclass) you want to create
     * @param {string} [color] - the color the shape should be drawn in
     * @return {Shape} - new Shape object
     */
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

/** Holds useful utility functions for creating and updating Line shapes */
export abstract class LineUtils {
    /**
     * Creates a new Line object
     * @param {number} x - the x-coordinate of the line's origin
     * @param {number} y - the y-coordinate of the line's origin
     * @param {number} [x2] - the x-coordinate of the line's end point
     * @param {number} [y2] - the y-coordinate of the line's end point
     * @param {string} [color] - the color of the line
     * @return {Line} - a new Line object
     */
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

    /**
     * Returns a flattened version of the line's coordinates
     * @param {Line} line - a Line object to get the flattened coordinates of
     * @return {number[]} - the flattened array of coordinates
     */
    static points(line: Line): number[] {
        return [
            line.start.x, line.start.y,
            line.end.x, line.end.y
        ]
    }

    /**
     * Calculate the length of a given Line object
     * @param {Line} line - the Line object you want to know the length of
     * @return {number} - length of the given line
     */
    static length_(line: Line): number {
        return PointUtils.distance(line.start, line.end)
    }

    /**
     * Calculate the angle of a given Line object
     * @param {Line} line - the Line object you want to know the angle of
     * @return {number} - angle of the given live
     */
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

/** Holds useful utility functions for creating and updating Poly shapes */
export abstract class PolyUtils {
    /**
     * Create a new Poly shape
     * @param {Point | Point[]} points - starting Point or Points in the line
     * @param {string} [color] - color of the poly-line
     * @return {Poly} - new Poly line object
     */
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

    /**
     * Flat array of coordinate values
     * @param {Poly} poly - the Poly object to get the point array of
     * @return {number[]} - flat array of coordinate values of passed poly shape
     */
    static points(poly: Poly): number[] {
        return _.flatMap(poly.points, (pt) => {
            return [pt.x, pt.y];
        })
    }

    /**
     * Calculates length of each line segment
     * @param {Point[]} points - array of points
     * @return {number[]} - the array of lengths between each pair of points
     */
    static calcLengths = (points: Point[]): number[] => (
        points.reduce((acc: number[], pt: Point, i: number, arr: Point[]) => {
            if (i < arr.length - 1) {
                acc.push(PointUtils.distance(pt, arr[i + 1]))
            }
            return acc;
        }, [])
    )

    /**
     * Calculates angle of each line segment (pair of points) in a set of points
     * @param {Point[]} points - array of points
     * @return {number[]} - array of angles of each line segment
     */
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

/** Holds useful utility functions for creating and updating Circle shapes */
export abstract class CircleUtils {
    /**
     * Create a new Circle object
     * @param {Point} center - center coordinate of the circle
     * @param {string} [color] - the color of the circle
     * @return {Circle} - new Circle object
     */
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