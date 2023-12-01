
import { IonButton, IonIcon } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import '../../../theme/style.css';
import { Camera, CameraResultType } from '@capacitor/camera';
import { fabric } from 'fabric';
import { imagesOutline, trashOutline, downloadOutline } from 'ionicons/icons';
import { saveAs } from 'file-saver';

interface EditorUIProps {
  canvas: fabric.Canvas | undefined;
}

const EditorUI: React.FC<EditorUIProps> = ({ canvas }) => {


  const getPhoto = async () => {
    Camera.pickImages
    const images = await Camera.pickImages({
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

  const deleteObject = () => {
    if (canvas === undefined)
      return;

    const activeObject = canvas.getActiveObject();

    if(!activeObject)
      return;

    canvas.remove(activeObject);
  }

  const saveCanvasAsImage = () => {
    if(canvas === undefined)
      return;

    canvas.toCanvasElement().toBlob(blob => saveAs(blob, 'estampa.png'))
  }


  return <>
    <IonButton fill="outline" onClick={getPhoto}><IonIcon className="in-btn-icon" icon={imagesOutline} slot="icon-only"></IonIcon></IonButton>
    <IonButton fill="outline" onClick={saveCanvasAsImage}><IonIcon className="in-btn-icon" icon={downloadOutline} slot="icon-only"></IonIcon></IonButton>
    <IonButton color="danger" fill="outline" onClick={deleteObject}><IonIcon className="in-btn-icon" icon={trashOutline} slot="icon-only"></IonIcon></IonButton>
  </>;
};

export default EditorUI;