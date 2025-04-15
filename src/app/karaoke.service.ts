import { Injectable } from '@angular/core';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { from, forkJoin, map, switchMap, Observable } from 'rxjs';
import { Song } from './SongInterface';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class KaraokeService {

  constructor(private firestore: Firestore) {
    console.log('🔥 Firestore service injected');
  }

  storage = getStorage();
  isSent: boolean = false;

  getSongsFromStorage() {
    const songsRef = ref(this.storage, '');

    return from(listAll(songsRef)).pipe(
      switchMap(res => {
        const jsonFiles = res.items.filter(item => item.name.endsWith('.json'));
        const downloadTasks = jsonFiles.map(fileRef =>
          from(getDownloadURL(fileRef)).pipe(
            switchMap(url => fetch(url).then(res => res.json())),
            map(data => ({
              ...data,
              fileName: fileRef.name  // 🔁 utile pour le routerLink plus tard
            }))
          )
        );
        return forkJoin(downloadTasks);
      })
    );
  }

  getSongById(fileName: string): Observable<Song | null> {
    const fileRef = ref(this.storage, fileName);

    return from(getDownloadURL(fileRef)).pipe(
      switchMap(url => fetch(url).then(res => res.json())),
      map(data => data as Song),
      map(data => ({ ...data, fileName }))
    );
  }

  getSongsFromStorageCropWord() {
    const songsRef = ref(this.storage, '');

    return from(listAll(songsRef)).pipe(
      switchMap(res => {
        const jsonFiles = res.items.filter(item => item.name.endsWith('_la_version_jeu.json'));
        const downloadTasks = jsonFiles.map(fileRef =>
          from(getDownloadURL(fileRef)).pipe(
            switchMap(url => fetch(url).then(res => res.json())),
            map(data => ({
              ...data,
              fileName: fileRef.name  // 🔁 utile pour le routerLink plus tard
            }))
          )
        );
        return forkJoin(downloadTasks);
      })
    );
  }

  diffuser(song: Song) {
    console.log('diffuser song:', song);
    const docRef = doc(this.firestore, 'broadcast/currentSong');
    setDoc(docRef, {
      fileName: song.fileName,
      startedAt: new Date(),
      startedBy: 'admin'
    });
    this.isSent = true;
  }

  arreterDiffusion() {
    const docRef = doc(this.firestore, 'broadcast/currentSong');
    setDoc(docRef, { fileName: null });
    this.isSent = false;
  }

  getIsSent() {
    return this.isSent;
  }

  isNoSongBroadcasting(): Observable<boolean> {
    const docRef = doc(this.firestore, 'broadcast/currentSong');
    return docData(docRef).pipe(
      map((data: any) => data?.fileName === null)
    );
  }



}
