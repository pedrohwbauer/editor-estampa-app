import { fabric } from "fabric";
import { EditorState } from "../EditorState";
import { IShapeObject } from "./IShapeObject";

const editorState = EditorState.getInstance();

export class LineObject implements IShapeObject {
  private line: fabric.Line;
  constructor(pointer: fabric.IPoint, line?: fabric.Line) {
    this.line =
      line ??
      new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: editorState.color,
        strokeWidth: editorState.strokeWidth,
      });
  }

  public update(pointer?: fabric.IPoint): void {
    this.line.set({
      ...(!pointer
        ? {}
        : {
            x2: pointer.x,
            y2: pointer.y,
          }),
      stroke: editorState.color,
    });
  }

  public getFabricObject() {
    return this.line;
  }
}
