import { Component, Input } from '@angular/core';
import { KaraokeService } from '../karaoke.service';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, map, switchMap } from 'rxjs';
import { Song } from '../SongInterface';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatcardComponent } from "../matcard/matcard.component";
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-invitee',
  // Removed invalid imports array
  templateUrl: './invitee.component.html',
  styleUrl: './invitee.component.scss',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, AsyncPipe, RouterModule, FormsModule, MatInputModule, MatIconModule], // Removed invalid imports array
})
export class InviteeComponent {
  @Input() searchTerm: string = '';


  constructor(public karaokeService: KaraokeService, private firestore: Firestore) { }
  broadcast$!: Observable<string | null>; // nom du fichier ou null
  songs$!: Observable<Song[]>;

  isFree$!: Observable<boolean>;


  ngOnInit() {
    this.isFree$ = this.karaokeService.isNoSongBroadcasting();

    const broadcastDoc = doc(this.firestore, 'broadcast/currentSong');
    this.broadcast$ = docData<{ fileName: string | null }>(broadcastDoc as any)
      .pipe(map((data: { fileName: string | null } | undefined) => data?.fileName ?? null));

    this.songs$ = this.broadcast$.pipe(
      switchMap(fileName => {
        if (fileName) {
          return this.karaokeService.getSongById(fileName).pipe(map(song => [song]));
        } else {
          return this.karaokeService.getSongsFromStorage();
        }
      })
    );
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
