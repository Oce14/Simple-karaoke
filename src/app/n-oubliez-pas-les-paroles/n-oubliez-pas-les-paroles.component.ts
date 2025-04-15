import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { KaraokeService } from '../karaoke.service';
import { Song } from '../SongInterface';
import { NgIf, NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-n-oubliez-pas-les-paroles',
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule, AsyncPipe, CommonModule, RouterLink, MatIconModule],
  templateUrl: './n-oubliez-pas-les-paroles.component.html',
  styleUrl: './n-oubliez-pas-les-paroles.component.scss'
})
export class NOubliezPasLesParolesComponent {
  song$: Observable<Song | null> = of(null);
  isSeent: boolean = false;


  constructor(
    private route: ActivatedRoute,
    public karaokeService: KaraokeService,
  ) { }

  ngOnInit() {
    this.song$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log('params id:', id);
        return id ? this.karaokeService.getSongById(id) : of(null);
      })
    );
  }


}
