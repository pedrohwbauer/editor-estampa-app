import { EditorState } from "../EditorState";
import { IShapeObject } from "../shape-objects/IShapeObject";
import { LineObject } from "../shape-objects/LineObject";
import { RectObject } from "../shape-objects/RectObject";

const editorState = EditorState.getInstance();

export class ShapeObjectFactory implements IFactory {

  public create(pointer: fabric.IPoint): IShapeObject | undefined {
    switch (editorState.mode) {
      case "rect":
        return new RectObject(pointer);
      case "line":
        return new LineObject(pointer);
    }

    return undefined;
  }
}
