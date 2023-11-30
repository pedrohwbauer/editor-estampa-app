import { fabric } from "fabric";

export interface IShapeObject {
  update(pointer?: fabric.IPoint): void;

  getFabricObject(): fabric.Object;
}