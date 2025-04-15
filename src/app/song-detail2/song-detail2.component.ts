import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { KaraokeService } from '../karaoke.service';
import { Song } from '../SongInterface';
import { NgIf, NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-song-detail2',
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, AsyncPipe, CommonModule, RouterLink, MatIconModule],
  templateUrl: './song-detail2.component.html',
  styleUrl: './song-detail2.component.scss'
})
export class SongDetail2Component implements OnInit {
  broadcast$!: Observable<string | null>; // nom du fichier ou null
  songs$!: Observable<Song[]>;
  song$: Observable<Song | null> = of(null);
  isSeent: boolean = false;


  constructor(
    private route: ActivatedRoute,
    public karaokeService: KaraokeService,
    private firestore: Firestore
  ) { }

  isFree$!: Observable<boolean>;


  ngOnInit() {
    this.isFree$ = this.karaokeService.isNoSongBroadcasting();
    this.song$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log('params id:', id);
        return id ? this.karaokeService.getSongById(id) : of(null);
      })
    );
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

}
