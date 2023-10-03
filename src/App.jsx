// eslint-disable-next-line no-unused-vars
import React,{ useState } from 'react';
import './App.css';
import Button from '../Components/Button/Button';
import Main from '../Components/Main/Main';
import Subtitulo from '../Components/Subtitulo/Subtitulo';
import Config from '../Components/Config/Config';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../credenciales/firebase-config.json';
import Footer from '../Components/Footer/Footer';

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

function App() {
  const [config, setConfig] = useState('en casa');

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
  };

  const handleClick = async () => {
    console.log('¡Se hizo clic en el botón!');

    const bucketName = config === 'en casa' ? firebaseConfig.storageBucket1 : firebaseConfig.storageBucket2;

    try {
      // Obtén una lista de los archivos en el bucket
      const { items } = await storage.ref(bucketName).listAll();

      if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const fileRef = items[randomIndex];

        // Obten la URL de descarga del archivo
        const downloadURL = await fileRef.getDownloadURL();

        // Muestra la imagen en una nueva ventana o en una ventana emergente
        window.open(downloadURL);
      }
    } catch (error) {
      console.log('Error al cargar la imagen:', error);
    }
  };

  return (
    <div>
      <Config onConfigChange={handleConfigChange} />
      <Main />
      <Subtitulo/>
      <Button onClick={handleClick} firebase={firebaseApp} firebaseConfig={firebaseConfig} config={config}>
      </Button>
      <Footer/>
    </div>
  );
}

export default App;
