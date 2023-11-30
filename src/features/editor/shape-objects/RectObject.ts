import { fabric } from "fabric";
import { EditorState } from "../EditorState";
import { IShapeObject } from "./IShapeObject";

const editorState = EditorState.getInstance();

export class RectObject implements IShapeObject {
  private rect: fabric.Rect;
  constructor(pointer: fabric.IPoint, rect?: fabric.Rect) {
    this.rect =
      rect ??
      new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        fill: editorState.color,
        width: 0,
        height: 0,
        selectable: false,
      });
  }

  public update(pointer?: fabric.IPoint): void {
    this.rect.set({
      ...(!pointer
        ? {}
        : {
            width: pointer.x - this.rect.left!,
            height: pointer.y - this.rect.top!,
          }),
      fill: editorState.color,
    });
  }

  public getFabricObject() {
    return this.rect;
  }
}
