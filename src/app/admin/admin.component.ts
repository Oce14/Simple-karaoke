import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { FormsModule } from '@angular/forms';
import { MatcardComponent } from "../matcard/matcard.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Song } from '../SongInterface';
import { KaraokeService } from '../karaoke.service';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-admin',
  imports: [FormsModule, MatcardComponent, MatFormFieldModule, MatInputModule, MatIconModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true
})
export class AdminComponent implements OnInit {
  pdfs: { name: string, url: string }[] = [];
  searchTerm = '';
  songs$: Observable<Song[]>;

  constructor(private songService: KaraokeService) {
    this.songs$ = this.songService.getSongsFromStorage();
  }

  async ngOnInit() {
    const storage = getStorage();
    const pdfsRef = ref(storage, ''); // Référence au dossier contenant les PDF
    const result = await listAll(pdfsRef);

    this.pdfs = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url
        };
      })
    );
  }

  filteredPdfs() {
    return this.pdfs.filter(pdf =>
      pdf.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  diffuser(pdf: { name: string, url: string }) {
    // On implémente la diffusion via Firestore juste après
    console.log('PDF à diffuser :', pdf);
  }
  selectPdf(pdf: { name: string, url: string }) {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'current/activePdf');

    setDoc(docRef, {
      name: pdf.name,
      url: pdf.url
    }).then(() => {
      console.log('PDF diffusé avec succès 🎉');
    }).catch((err) => {
      console.error('Erreur Firestore :', err);
    });
  }

  filteredSongs(songs: Song[]): Song[] {
    if (!this.searchTerm?.trim()) return songs;
    const term = this.searchTerm.toLowerCase();
    return songs.filter(song =>
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term)
    );
  }
}
