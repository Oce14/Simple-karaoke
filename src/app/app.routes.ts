import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { InviteeComponent } from './invitee/invitee.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongDetail2Component } from './song-detail2/song-detail2.component';
import { NOubliezPasLesParolesComponent } from './n-oubliez-pas-les-paroles/n-oubliez-pas-les-paroles.component';

export const routes: Routes = [
    { path: 'admin', component: AdminComponent },
    { path: 'invite', component: InviteeComponent },
    { path: 'paroles/:id', component: SongDetailComponent },
    { path: 'paroles-details/:id', component: SongDetail2Component },
    { path: 'games', component: NOubliezPasLesParolesComponent },
    { path: '', redirectTo: 'invite', pathMatch: 'full' }
];
