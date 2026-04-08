import { Routes } from '@angular/router';
import { MissiondetailsComponent } from './components/missiondetails/missiondetails';
import { MissionlistComponent } from './components/missionlist/missionlist';

export const routes: Routes = [
  { path: '', component: MissionlistComponent, title: 'SpaceX missions' },
  { path: 'mission/:flightNumber', component: MissiondetailsComponent, title: 'Mission details' },
  { path: '**', redirectTo: '' },
];
