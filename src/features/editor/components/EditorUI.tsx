
import { IonButton, IonIcon } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import '../../../theme/style.css';
import { Camera, CameraResultType } from '@capacitor/camera';
import { fabric } from 'fabric';
import { imagesOutline, colorPaletteOutline, moveOutline, squareOutline } from 'ionicons/icons';

interface EditorUIProps {
  canvas: fabric.Canvas | undefined;
}

const EditorUI: React.FC<EditorUIProps> = ({ canvas }) => {


  const getPhoto = async () => {
    Camera.pickImages
    const images= await Camera.pickImages({
      quality: 90,
      limit: 1
      // allowEditing: true,
      // resultType: CameraResultType.Uri
    });

    const image = images.photos[0];

    console.log(image.webPath);

    if (canvas === undefined)
      return;
    fabric.Image.fromURL(image.webPath!, function (oImg) {
      canvas.add(oImg);
    });
  }


  return <>
    <IonButton fill="outline" onClick={getPhoto}><IonIcon className="in-btn-icon" icon={imagesOutline}></IonIcon></IonButton>
  </>;
};

export default EditorUI;