/**
 * Type & Class declarations for state-manipulation actions
 */
import {Shape, ShapeKind} from "./shapes";


/////---------------------------------------------------------------------------
///     ROOT LEVEL ACTION DEFINITIONS:
/////---------------------------------------------------------------------------

// Items in state that an action can target:
export enum ActionTarget {
    None,
    Shapes,
    Mode,
}

/** The abstract base class for all action types */
export abstract class Action {
    abstract target: ActionTarget = ActionTarget.None;

    /** @return {this is ShapesUpdateAction} */
    targetsShapes(): this is ShapesUpdateAction {
        return this.target === ActionTarget.Shapes
    }
    /** @return {this is ChangeDrawModeAction} */
    targetsDrawMode(): this is ChangeDrawModeAction {
        return this.target === ActionTarget.Mode
    }
}


/////---------------------------------------------------------------------------
///     ACTIONS THAT TARGET SHAPES:
/////---------------------------------------------------------------------------

// Types of update actions that targets shapes
export enum ShapesUpdateActionKind {
    Create,
    Continue,
    End,
    Remove,
}

/**
 * Abstract base class for all actions that target shapes
 * @extends Action
 */
export abstract class ShapesUpdateAction extends Action {
    abstract kind: ShapesUpdateActionKind;
    target = ActionTarget.Shapes;

    /** @return {this is CreateShapeAction} */
    createKind(): this is CreateShapeAction {
        return this.kind === ShapesUpdateActionKind.Create;
    }
    /** @return {this is ContinueShapeAction} */
    continueKind(): this is ContinueShapeAction {
        return this.kind === ShapesUpdateActionKind.Continue;
    }
    /** @return {this is EndShapeAction} */
    endKind(): this is EndShapeAction {
        return this.kind === ShapesUpdateActionKind.End;
    }
}


/**
 * Action to create a new shape
 * @extends ShapesUpdateAction
 */
export class CreateShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.Create;
    payload: Shape;

    /**
     * Create a new CreateShapeAction
     * @param {Shape} newShape - The new shape that you want added to state
     */
    constructor(newShape: Shape) {
        super();
        this.payload = newShape
    }
}

/**
 * Action to update an existing shape
 * @extends ShapesUpdateAction
 */
export class ContinueShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.Continue;
    targetShape: string;
    payload: Partial<Shape>

    /**
     * Create a new ContinueShapeAction
     * @param {string} shapeId - the ID of the shape you need to update
     * @param {Partial<Shape>} updateValues - the partial shape with new values
     */
    constructor(shapeId: string, updateValues: Partial<Shape>) {
        super();
        this.targetShape = shapeId;
        this.payload = updateValues;
    }
}

/**
 * Action to end a shape-drawing session
 * @extends ShapesUpdateAction
 */
export class EndShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.End;
    targetShape: string;

    /**
     * Create a new EndShapeAction
     * @param {string} shapeId - the ID of the shape that you are done drawing
     */
    constructor(shapeId: string) {
        super();
        this.targetShape = shapeId
    }
}



/////---------------------------------------------------------------------------
///     ACTIONS THAT TARGET DRAWING-MODE:
/////---------------------------------------------------------------------------

/**
 * Action to change the shape-drawing mode
 * @extends Action
 */
export class ChangeDrawModeAction extends Action {
    target = ActionTarget.Mode;
    value: ShapeKind;

    /**
     * Create a new ChangeDrawModeAction
     * @param {ShapeKind} value - shape-type to change the drawing mode to
     */
    constructor(value: ShapeKind) {
        super();
        this.value = value;
    }
}
