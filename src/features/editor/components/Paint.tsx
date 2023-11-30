import { fabric } from 'fabric';
import { useEffect } from 'react';
import { EditorState } from '../EditorState';
import { ShapeObjectFactory} from '../factories/ShapeObjectFactory'
import { IShapeObject } from '../shape-objects/IShapeObject';

interface PaintProps {
  canvas: fabric.Canvas | undefined
}

const Paint: React.FC<PaintProps> = ({ canvas }) => {
  const editorState = EditorState.getInstance();

  useEffect(() => {
    if (canvas === undefined)
      return;

    const shapeObjectFactory = new ShapeObjectFactory();
    let selectedObject: IShapeObject | undefined;
    let mouseDown = false;

    const handleMouseDown = (o: fabric.IEvent<MouseEvent>) => {
      mouseDown = true;

      const pointer = canvas.getPointer(o.e);

      selectedObject = shapeObjectFactory.create(pointer);

      if(selectedObject !== undefined)
        canvas.add(selectedObject.getFabricObject());
    };

    const handleMouseMove = (o: fabric.IEvent<MouseEvent>) => {
      if (!mouseDown) return;

      if (selectedObject === undefined) return;

      const pointer = canvas.getPointer(o.e);

      selectedObject.update(pointer);

      canvas.requestRenderAll();
    };

    const handleMouseUp = (o: fabric.IEvent<MouseEvent>) => {
      mouseDown = false;

      if (selectedObject === undefined) return;

      const fabricObject = selectedObject.getFabricObject();

      fabricObject.setCoords();
      fabricObject.selectable = true;

      selectedObject = undefined;
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    return () => {
      if (canvas === undefined) return;

      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
    }

  }, [canvas]);




  return <></>;

};

export default Paint;
