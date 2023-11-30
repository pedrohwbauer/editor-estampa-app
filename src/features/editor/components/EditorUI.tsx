
import { IonButton, IonIcon } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import '../../../theme/style.css';
import { EditorState } from '../EditorState';
import { Camera, CameraResultType } from '@capacitor/camera';
import { fabric } from 'fabric';
import { imagesOutline, colorPaletteOutline, moveOutline, squareOutline } from 'ionicons/icons';

interface EditorUIProps {
  canvas: fabric.Canvas | undefined;
}

const EditorUI: React.FC<EditorUIProps> = ({ canvas }) => {
  const editorState = EditorState.getInstance();
  const [mode, setMode] = useState<EditorState['mode']>(editorState.mode)

  useEffect(() => {
    editorState.mode = mode;
  }, [mode])

  const fillIfMode = (buttonMode: EditorState['mode']) => {
    return mode === buttonMode ? 'solid' : 'outline';
  }

  const updateColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    editorState.color = e.target.value;
    console.log(editorState.color);
  }

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
    <IonButton fill={fillIfMode('select')} onClick={() => setMode('select')}>
      <IonIcon className="in-btn-icon" icon={moveOutline}/>
    </IonButton>
    <IonButton fill={fillIfMode('rect')} onClick={() => setMode('rect')}>
      <IonIcon className="in-btn-icon" icon={squareOutline}/>
    </IonButton>
    <IonButton fill={fillIfMode('line')} onClick={() => setMode('line')}>Line</IonButton>

    <IonButton fill="outline" className="color-picker-button">
      <IonIcon className="in-btn-icon" icon={colorPaletteOutline}/>
      <input className="color-picker" type="color" onChange={updateColor} />
    </IonButton>

    <IonButton fill="outline" onClick={getPhoto}><IonIcon className="in-btn-icon" icon={imagesOutline}></IonIcon></IonButton>
  </>;
};

export default EditorUI;