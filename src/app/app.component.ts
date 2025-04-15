import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@angular/fire/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'paroleAnnivIsa';
  constructor() {
    const firebaseConfig = environment.firebase; // Utiliser ta configuration Firebase ici
    initializeApp(firebaseConfig);  // Initialisation de Firebase
  }

  // Exemple d'accès à Firestore
  getFirestoreDb() {
    return getFirestore();
  }

  // Exemple d'accès à Firebase Storage
  getStorageService() {
    return getStorage();
  }
}
