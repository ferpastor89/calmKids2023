/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './Button.css';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

// eslint-disable-next-line react/prop-types
function Button({ onClick, children, firebase, firebaseConfig, config }) {
  const cargarImagen = async () => {
    const bucketName = config === 'en casa' ? firebaseConfig.storageBucket1 : firebaseConfig.storageBucket2;

    try {
      // Obtiene una lista de los archivos en el bucket
      const storage = getStorage(firebase);
      const storageRef = ref(storage, bucketName);
      const filesSnapshot = await listAll(storageRef);

      const files = filesSnapshot.items;

      if (files.length > 0) {
        const randomIndex = Math.floor(Math.random() * files.length);
        const fileRef = files[randomIndex];

        // Obtiene la URL de descarga del archivo
        const downloadURL = await getDownloadURL(fileRef);

        // Muestra la imagen en una nueva ventana o en una ventana emergente
        window.open(downloadURL);
      }
    } catch (error) {
      console.log('Error al cargar la imagen:', error);
    }
  };

  return (
    <button className="button" onClick={cargarImagen}>
      <h4 className='textButton'>¡Probame!</h4>
    </button>
  );
}

export default Button;
