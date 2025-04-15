import { Component } from '@angular/core';
import { FirebaseStorageService } from '../firebase-storage.service';

@Component({
  selector: 'app-upload-pdf',
  imports: [],
  templateUrl: './upload-pdf.component.html',
  styleUrl: './upload-pdf.component.scss'
})
export class UploadPdfComponent {
  constructor(private firebaseStorageService: FirebaseStorageService) { }

  // Gérer l'événement de sélection du fichier
  onFileSelected(event: any) {
    const file = event.target.files[0];  // Récupérer le fichier sélectionné
    if (file) {
      const path = `pdfs/${file.name}`;  // Définir le chemin de stockage dans Firebase
      this.firebaseStorageService.uploadFile(file, path);  // Appeler la méthode pour uploader le fichier
    }
  }
}
