import React, {Dispatch, useReducer} from "react";
import styled from "styled-components";
import Canvas from "./Canvas/Canvas";
import useThetaPadState from "./useThetaPadState";
import {uuid} from "react-uuid";


/////---------------------------------------------------------------------------
///     SHAPE TYPES:
/////---------------------------------------------------------------------------

export enum ShapeKind {
    None,
    Line,
    Poly,
    Circle,
}


class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

    }
}

export class Shape {
    id: string;
    kind: ShapeKind;
    origin: Point;
    color: string;
    isUnit: boolean;
    showDetails: boolean;

    constructor(x: number, y: number, kind: ShapeKind, color: string = "black") {
        this.id = Date.now().toString();
        this.kind = kind;
        this.origin = new Point(x, y);
        this.color = color;
        this.isUnit = false;
        this.showDetails = false;
    }

    update(updateValues: Partial<Shape>) {
        for (let [attr, val] of Object.entries(updateValues)) {
            if (attr in this) {
                this[attr] = val;
            } else {
                console.error("POSSIBLE MISMATCHED TYPES ")
            }
        }
    }
}

export class Line extends Shape {
    start: Point;
    end: Point;
    length: number;
    angle: number;

    constructor(x: number, y: number, color: string = "black", ) {
        super(x, y, ShapeKind.Line, color);
        this.start = this.origin;
        this.end = this.origin
        this.length = 0;
        this.angle = 0;
    }
}
export class Poly extends Shape {
    points: Point[];
    distances: number[];
    angles: number[];

    constructor(x: number, y: number, color: string = "blue") {
        super(x, y, ShapeKind.Poly, color);
        this.points = [this.origin]
        this.distances = [0];
        this.angles = [0];
    }
}

export class Circle extends Shape {
    r: number;
    constructor(x: number, y: number, color: string = "red") {
        super(x, y, ShapeKind.Circle, color);
        this.r = 0;
    }
}



/////---------------------------------------------------------------------------
///     ACTION TYPES:
/////---------------------------------------------------------------------------

/// TOP LEVEL ACTION:
export enum ActionTarget {
    None,
    Shapes,
    Mode,
}

export abstract class Action {
    abstract target: ActionTarget = ActionTarget.None;

    targetsShapes(): this is ShapesUpdateAction {
        return this.target === ActionTarget.Shapes
    }
    targetsDrawMode(): this is ChangeDrawModeAction {
        return this.target === ActionTarget.Mode
    }
}


/// SHAPES UPDATE ACTIONS
export enum ShapesUpdateActionKind {
    Create,
    Continue,
    End,
    Remove,
}

export abstract class ShapesUpdateAction extends Action {
    abstract kind: ShapesUpdateActionKind;
    target = ActionTarget.Shapes;

    createKind(): this is CreateShapeAction {
        return this.kind === ShapesUpdateActionKind.Create;
    }
    continueKind(): this is ContinueShapeAction {
        return this.kind === ShapesUpdateActionKind.Continue;
    }
}

export class CreateShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.Create;
    payload: Shape;
    constructor(newShape: Shape) {
        super();
        this.payload = newShape
    }
}

export class ContinueShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.Continue;
    payload: Partial<Shape>

    constructor(updateValues: Partial<Shape>) {
        super();
        this.payload = updateValues;
    }
}


export class ChangeDrawModeAction extends Action {
    target = ActionTarget.Mode;
    value: ShapeKind;
    constructor(value: ShapeKind) {
        super();
        this.value = value;
    }
}



/////---------------------------------------------------------------------------
///     STYLE:
/////---------------------------------------------------------------------------

interface ThetaPadStyleProps {
    width?: number,
    height?: number,
}

const ThetaPadRoot = styled.div<ThetaPadStyleProps>`
  width: 100vw;
  height: 100vw;
  background: white;
  h1 {
    color: red;
  }
  .hiThere {
    color: ivory;
  }
  &:hover {
    background: red;
  }
`;


/////---------------------------------------------------------------------------
///     CONTEXT DEFINITIONS:
/////---------------------------------------------------------------------------

export interface ThetaPadStateType {
    dispatch;
    handleCanvasClick;
    drawMode: ShapeKind;
    shapes: Shape[];
}

const ThetaPadContext = React.createContext<ThetaPadStateType | null>(null);



/////---------------------------------------------------------------------------
///     COMPONENT DEFINITION:
/////---------------------------------------------------------------------------

const ThetaPad: React.FC<{}> = (props) => {
    const thetaPadState = useThetaPadState();
    return (
        <ThetaPadContext.Provider
            value={thetaPadState}
        >
            <ThetaPadRoot onClick={thetaPadState.handleCanvasClick}>
                <Canvas/>
            </ThetaPadRoot>
        </ThetaPadContext.Provider>
    )
}

export default ThetaPad;