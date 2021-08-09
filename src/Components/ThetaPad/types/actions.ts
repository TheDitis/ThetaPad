/** actions.ts
 * @file Type & Class declarations for state-manipulation actions
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Shape, ShapeKind} from "./shapes";
import {Action as ReduxAction} from "@reduxjs/toolkit";

/////---------------------------------------------------------------------------
///     ROOT LEVEL ACTION DEFINITIONS:
/////---------------------------------------------------------------------------

// Items in state that an action can target:
export enum ActionTarget {
    None,
    Shapes,
    TempShape,
    DrawMode,
    Unit,
}

/** The abstract base class for all action types */
export abstract class Action implements ReduxAction {
    abstract target: ActionTarget = ActionTarget.None;

    get type() {return this.target}

    /** @return {this is ShapesUpdateAction} */
    targetsShapes(): this is ShapesUpdateAction {
        return this.target === ActionTarget.Shapes;
    }
    /** @return {this is TempShapeUpdateAction} */
    targetsTempShapes(): this is TempShapeUpdateAction {
        return this.target === ActionTarget.TempShape;
    }
    /** @return {this is ChangeDrawModeAction} */
    targetsDrawMode(): this is ChangeDrawModeAction {
        return this.target === ActionTarget.DrawMode;
    }
    /** @return {this is ChangeUnitAction} */
    targetsUnit(): this is ChangeUnitAction {
        return this.target === ActionTarget.Unit;
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
    isCreateKind(): this is CreateShapeAction {
        return this.kind === ShapesUpdateActionKind.Create;
    }
    /** @return {this is UpdateShapeAction} */
    isUpdateKind(): this is UpdateShapeAction {
        return this.kind === ShapesUpdateActionKind.Continue;
    }
    /** @return {this is EndShapeAction} */
    isEndKind(): this is EndShapeAction {
        return this.kind === ShapesUpdateActionKind.End;
    }
    /** @return {this is RemoveShapeAction} */
    isRemoveKind(): this is RemoveShapeAction {
        return this.kind === ShapesUpdateActionKind.Remove;
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
export class UpdateShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.Continue;
    targetShape: string;
    payload: Partial<Shape>

    /**
     * Create a new UpdateShapeAction
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

/**
 * Action to remove shape with a given ID
 * @extends ShapesUpdateAction
 */
export class RemoveShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.Remove;
    targetShape: string;

    /**
     * Create a new RemoveShapeAction
     * @param {string} shapeId - the ID of the shape you want to remove
     */
    constructor(shapeId: string) {
        super();
        this.targetShape = shapeId;
    }
}



/////---------------------------------------------------------------------------
///     ACTIONS THAT TARGET TEMP-SHAPE:
/////---------------------------------------------------------------------------

// TODO: Document these new actions
export enum TempShapeUpdateActionKind {
    Create,
    Update,
    Complete,
    Cancel,
}

export abstract class TempShapeUpdateAction extends Action {
    abstract kind: TempShapeUpdateActionKind;
    target = ActionTarget.TempShape;
}

export class CreateTempShapeAction extends TempShapeUpdateAction {
    kind = TempShapeUpdateActionKind.Create;
    payload: Shape;

    constructor(newShape: Shape) {
        super();
        this.payload = newShape;
    }
}

export class UpdateTempShapeAction extends TempShapeUpdateAction {
    kind = TempShapeUpdateActionKind.Update;
    payload: Partial<Shape>;

    constructor(updateValues: Partial<Shape>) {
        super();
        this.payload = updateValues;
    }
}

export class CompleteShapeAction extends TempShapeUpdateAction {
    kind = TempShapeUpdateActionKind.Complete;
}

export class CancelTempShapeAction extends TempShapeUpdateAction {
    kind = TempShapeUpdateActionKind.Cancel;
}



/////---------------------------------------------------------------------------
///     ACTIONS THAT TARGET DRAWING-MODE:
/////---------------------------------------------------------------------------

/**
 * Action to change the shape-drawing mode
 * @extends Action
 */
export class ChangeDrawModeAction extends Action {
    target = ActionTarget.DrawMode;
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


/////---------------------------------------------------------------------------
///     ACTIONS THAT TARGET THE BASE UNIT:
/////---------------------------------------------------------------------------

/**
 * Action to change the length measurement unit
 * @extends Action
 */
export class ChangeUnitAction extends Action {
    target = ActionTarget.Unit;
    value: number;

    /**
     * Create a new ChangeUnitAction
     * @param {number} newValue - the new value to measure all lengths by
     */
    constructor(newValue: number) {
        super();
        this.value = newValue;
    }
}

/**
 * Action to set the length measurement unit back to its default (1)
 * @extends ChangeUnitAction
 */
export class ResetUnitAction extends ChangeUnitAction {

    /** Create a new ResetUnitAction */
    constructor() {
        super(1);
    }
}