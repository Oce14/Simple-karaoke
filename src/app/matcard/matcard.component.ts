
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { KaraokeService } from '../karaoke.service';
import { Song } from '../SongInterface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-matcard',
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, AsyncPipe, RouterModule],
  templateUrl: './matcard.component.html',
  styleUrl: './matcard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MatcardComponent {
  songs$!: Observable<Song[]>;
  @Input() searchTerm: string = '';


  constructor(private karaokeService: KaraokeService) { }


  ngOnInit() {
    this.songs$ = this.karaokeService.getSongsFromStorage();
    this.karaokeService.getSongsFromStorage().subscribe(songs => {
      console.log('🎵 Chansons récupérées :', songs);
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


