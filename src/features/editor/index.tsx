import { fabric } from 'fabric';
import { useEffect, useState, useRef } from 'react';
import Paint from './components/Paint';
import EditorUI from './components/EditorUI';

interface EditorProps { }

const Editor: React.FC<EditorProps> = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  useEffect(() => {
    const canvas = new fabric.Canvas('c', {
      width: 800,
      height: 800,
    });

    setCanvas(canvas)

    return () => {
      setCanvas(undefined);
      canvas.dispose();
    };
  }, []);

  return <>
    <EditorUI canvas={canvas}></EditorUI>
    <canvas id="c"></canvas>
    <Paint canvas={canvas}></Paint>
  </>;

};

export default Editor;
