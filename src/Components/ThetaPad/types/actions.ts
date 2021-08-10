/** actions.ts
 * @file Type & Class declarations for state-manipulation actions
 * @author Ryan McKay <ryanscottmckay@gmail.com>
 */
import {Shape, ShapeKind} from "./shapes";
import {Action as ReduxAction} from "@reduxjs/toolkit";
import {getOwnPropertyDescriptors} from "immer/dist/utils/common";

/////---------------------------------------------------------------------------
///     ROOT LEVEL ACTION DEFINITIONS:
/////---------------------------------------------------------------------------

// Items in state that an action can target:
export enum ActionTarget {
    None = "None",
    Shapes = "Shapes",
    TempShape = "TempShape",
    DrawMode = "DrawMode",
    Unit = "Unit",
}

/** The abstract base class for all action types */
export abstract class Action implements ReduxAction {
    abstract target: ActionTarget = ActionTarget.None;
    abstract get type();

    /** @return {this is ShapesUpdateAction} */
    targetsShapes(): this is ShapesUpdateAction {
        return this.target === ActionTarget.Shapes;
    }
    /** @return {this is TempShapeUpdateAction} */
    targetsTempShape(): this is TempShapeUpdateAction {
        return this.target === ActionTarget.TempShape;
    }
    /** @return {this is ChangeDrawModeAction} */
    targetsDrawMode(): this is ChangeDrawModeAction {
        return this.target === ActionTarget.DrawMode;
    }
    /** @return {this is SetUnitAction} */
    targetsUnit(): this is SetUnitAction {
        return this.target === ActionTarget.Unit;
    }

    get toRedux(): {} {
        const keys = Object.getOwnPropertyNames(this);
        const newObj =  keys.reduce((classAsObj, key) => {
            if (key === "payload") {
                classAsObj[key] = this[key].asObject()
            }
            else {
                classAsObj[key] = this[key]
            }
            return classAsObj
        }, {})
        newObj["type"] = this.type;
        console.log("toRedux result: ", newObj)
        return newObj
    }

}


/////---------------------------------------------------------------------------
///     ACTIONS THAT TARGET SHAPES:
/////---------------------------------------------------------------------------

// Types of update actions that targets shapes
export enum ShapesUpdateActionKind {
    Create = "Create",
    Update = "Update",
    End = "End",
    Remove = "Remove",
}

/**
 * Abstract base class for all actions that target shapes
 * @extends Action
 */
export abstract class ShapesUpdateAction extends Action {
    abstract kind: ShapesUpdateActionKind;
    target = ActionTarget.Shapes;

    get type(): string {
        return `${this.target}/${this.kind}`;
    }

    /** @return {this is CreateShapeAction} */
    isCreateKind(): this is CreateShapeAction {
        return this.kind === ShapesUpdateActionKind.Create;
    }
    /** @return {this is UpdateShapeAction} */
    isUpdateKind(): this is UpdateShapeAction {
        return this.kind === ShapesUpdateActionKind.Update;
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
//    get toRedux(): {} {
//        return {type: `${this.target}/${this.kind}`, payload: this.payload}
//    }
}

/**
 * Action to update an existing shape
 * @extends ShapesUpdateAction
 */
export class UpdateShapeAction extends ShapesUpdateAction {
    kind = ShapesUpdateActionKind.Update;
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
    Create = "Create",
    Update = "Update",
    Complete = "Complete",
    Cancel = "Cancel",
}

export abstract class TempShapeUpdateAction extends Action {
    abstract kind: TempShapeUpdateActionKind;
    target = ActionTarget.TempShape;
    get type() {
        return this.target + "/" + this.kind;
    }

    isCreateKind(): this is CreateTempShapeAction {
        return this.kind === TempShapeUpdateActionKind.Create;
    }
    isUpdateKind(): this is UpdateTempShapeAction {
        return this.kind === TempShapeUpdateActionKind.Update;
    }
    isCompleteKind(): this is CompleteTempShapeAction {
        return this.kind === TempShapeUpdateActionKind.Complete;
    }
    isCancelKind(): this is CancelTempShapeAction {
        return this.kind === TempShapeUpdateActionKind.Cancel;
    }
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

export class CompleteTempShapeAction extends TempShapeUpdateAction {
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

    get type() {
        return this.target;
    }

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

export enum UnitUpdateActionKind {
    Set = "Set",
    Reset = "Reset",
}

export abstract class UnitUpdateAction extends Action {
    target = ActionTarget.Unit;
    abstract kind: UnitUpdateActionKind;
    abstract value: number;

    get type() {
        return `${this.target}/${this.kind}`;
    }
}

/**
 * Action to change the length measurement unit
 * @extends Action
 */
export class SetUnitAction extends UnitUpdateAction {
    kind = UnitUpdateActionKind.Set;
    value: number;

    /**
     * Create a new SetUnitAction
     * @param {number} newValue - the new value to measure all lengths by
     */
    constructor(newValue: number) {
        super();
        this.value = newValue;
    }
}

/**
 * Action to set the length measurement unit back to its default (1)
 * @extends SetUnitAction
 */
export class ResetUnitAction extends SetUnitAction {
    kind = UnitUpdateActionKind.Reset;

    /** Create a new ResetUnitAction */
    constructor() {
        super(1);
    }
}