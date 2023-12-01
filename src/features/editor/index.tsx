import { fabric } from 'fabric';
import { useEffect, useState, useRef } from 'react';
import Paint from './components/Paint';
import EditorUI from './components/EditorUI';

interface EditorProps { }

const Editor: React.FC<EditorProps> = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  useEffect(() => {
    const canvas = new fabric.Canvas('c', {
      width: 120,
      height: 200,
    });

    setCanvas(canvas);

    // const canvasHTML = document.getElementById("c") as HTMLCanvasElement;
    // const ctx = canvasHTML.getContext("2d")

    // ctx!.scale(0.1, 0.1);

    return () => {
      setCanvas(undefined);
      canvas.dispose();
    };
  }, []);

  return <>
    <EditorUI canvas={canvas}></EditorUI>
    <div className="img-container">
      <canvas id="c"></canvas>
    </div>
    <Paint canvas={canvas}></Paint>
  </>;

};

export default Editor;
