import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailedComponent } from './subject-detailed/subject-detailed.component';

const routes: Routes = [
  {
    path: 'beallitasok',
    component: SettingsComponent
  },
  {
    path: 'tantargyak/:tantargyId/hallgatok/:hallgatoId',
    component: SettingsComponent
  },
  {
    path: 'tantargyak/:id',
    component: SubjectDetailedComponent
  },
  {
    path: '**',
    component: SubjectListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
