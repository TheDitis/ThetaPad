/**
 * Type & Class declarations for shape objects
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */


/////---------------------------------------------------------------------------
///     SHAPE TYPES:
/////---------------------------------------------------------------------------

// This is the type of the primary 'shapes' object in state
export type ShapeMap = {[id: string]: Shape}

// Subtypes of shape
export enum ShapeKind {
    None,
    Line,
    Poly,
    Circle,
}

/** Represents a 2D point. */
export class Point {
    x: number;
    y: number;

    /**
     * Create a new Point
     * @param {number} x - the X coordinate
     * @param {number} y - the Y coordinate
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculates absolute distance from another point
     * @param {Point} otherPoint - The point you want find distance to
     * @return {number} - Absolute difference between this point and otherPoint
     */
    distanceFrom(otherPoint: Point): number {
        const yDist = Math.abs(this.y - otherPoint.y);
        const xDist = Math.abs(this.x - otherPoint.x);
        return Math.sqrt((yDist ** 2) + (xDist ** 2))
    }
}

/** Abstract base class for shapes (Line, Poly, & Circle) */
export abstract class Shape {
    id: string;
    kind: ShapeKind;
    origin: Point;
    color: string;
    isUnit: boolean;
    showDetails: boolean;

    /**
     * Initializes base shape properties, generating an id and setting defaults
     * @param {number} x - the origin X coordinate
     * @param {number} y - the origin Y coordinate
     * @param {ShapeKind} kind - the type (subclass) of shape this instance is
     * @param {string} color - the color the shape should be drawn in
     * @protected
     */
    protected constructor(
        x: number,
        y: number,
        kind: ShapeKind,
        color: string = "black"
    ) {
        this.id = Date.now().toString();
        this.kind = kind;
        this.origin = new Point(x, y);
        this.color = color;
        this.isUnit = false;
        this.showDetails = false;
    }

    /**
     * Updates own values with those passed
     * @param {Partial<Shape>} updateValues - the partial shape with new values
     */
    update(updateValues: Partial<Shape>) {
        for (let [attr, val] of Object.entries(updateValues)) {
            if (attr in this) {
                this[attr] = val;
            } else {
                console.error(
                    "POSSIBLE MISMATCHED TYPES. ", attr, " does not exist on ",
                    "shape of type: ", this.kind
                )
            }
        }
    }

    /** @return {this is Line} */
    isLine(): this is Line {
        return this.kind === ShapeKind.Line;
    }
    /** @return {this is Poly} */
    isPoly(): this is Poly {
        return this.kind === ShapeKind.Poly;
    }
    /** @return {this is Circle} */
    isCircle(): this is Circle {
        return this.kind === ShapeKind.Circle
    }
}


/////---------------------------------------------------------------------------
///     SHAPE SUB-TYPES:
/////---------------------------------------------------------------------------

/**
 * Represents a straight line, with only start and end points
 * @extends Shape
 */
export class Line extends Shape {
    start: Point;
    end: Point;
    angle: number;

    /**
     * Create a new Line, with only a starting point and color
     * @param {number} x - initial X coordinate
     * @param {number} y - initial Y coordinate
     * @param {string} color - the color it should be drawn in
     */
    constructor(x: number, y: number, color: string = "black", ) {
        super(x, y, ShapeKind.Line, color);
        this.start = new Point(x, y);
        this.end = new Point(x, y);
        this.angle = 0;
    }

    /**
     * Get the length of this line
     * @return {number} - the length of the line
     */
    get length(): number {
        return this.start.distanceFrom(this.end);
    }

    /**
     * Get an array of the individual coordinate values
     * @return {number[]} - Array of coordinate values [x1, y1, x2, y2]
     */
    get points(): number[] {
        return [this.start.x, this.start.y, this.end.x, this.end.y]
    }

    /**
     * Get an array of the coordinate values, translated to start at 0, 0
     * @return {number[]} - Translated coordinate values [0, 0, x2-x1, y2-y1]
     */
    get zeroedPoints() {
        return [0, 0, this.end.x - this.start.x, this.end.y - this.start.y];
    }

}

/**
 * Represents a line with more than 2 points
 * @extends shape
 */
export class Poly extends Shape {
    points: Point[];
    distances: number[];
    angles: number[];

    /**
     * Create a new Poly line, starting at (x, y)
     * @param {number} x - starting X coordinate
     * @param {number} y - starting Y coordinate
     * @param {string} color - the color to draw this line in
     */
    constructor(x: number, y: number, color: string = "blue") {
        super(x, y, ShapeKind.Poly, color);
        this.points = [this.origin]
        this.distances = [0];
        this.angles = [0];
    }
}

/**
 * Represents a circle
 * @extends shape
 */
export class Circle extends Shape {
    r: number;

    /**
     * Create a new Circle Shape
     * @param {number} x - center X coordinate
     * @param {number} y - center Y coordinate
     * @param {string} color - the color to draw this circle in
     */
    constructor(x: number, y: number, color: string = "red") {
        super(x, y, ShapeKind.Circle, color);
        this.r = 0;
    }
}
