


// Subtypes of shape
export enum ShapeKind {
    Line = "Line",
    Poly = "Poly",
    Circle = "Circle",
}

// Map labels to their ShapeKind
export const ShapeKindOptions: {[label: string]: ShapeKind} = {
    Line: ShapeKind.Line,
    Poly: ShapeKind.Poly,
    Circle: ShapeKind.Circle,
}

/** Represents a 2D point */
export interface Point {
    x: number;
    y: number;
}

export interface Shape {
    id: string;
    kind: ShapeKind;
    origin: Point;
    color?: string;
}