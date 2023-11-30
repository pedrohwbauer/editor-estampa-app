import { fabric } from 'fabric';
import { useEffect } from 'react';


interface PaintProps {
  canvas: fabric.Canvas | undefined
}

const Paint: React.FC<PaintProps> = ({ canvas }) => {

  useEffect(() => {
    if (canvas === undefined)
      return;

    
    return () => {
      if (canvas === undefined) return;

    }

  }, [canvas]);




  return <></>;

};

export default Paint;
