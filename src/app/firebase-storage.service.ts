import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  private storage: Storage;

  constructor() {
    // Initialisation de Firebase Storage
    this.storage = getStorage();  // Cette méthode est utilisée avec Firebase v9+
  }

  uploadFile(file: File, path: string) {
    if (!path) {
      console.error('Le chemin du fichier est undefined!');
      return;
    }

    // Créer une référence dans Firebase Storage
    const storageRef = ref(this.storage, path);

    // Upload du fichier
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Suivi de l'état du téléchargement si nécessaire
      },
      (error) => {
        console.error('Erreur lors du téléchargement du fichier', error);
      },
      () => {
        // Téléchargement terminé, obtenir l'URL du fichier
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('Fichier téléchargé avec succès:', url);
        });
      }
    );
  }
}