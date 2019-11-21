import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailedComponent } from './organization-detailed/organization-detailed.component';
import { RepositoryDetailedComponent } from './repository-detailed/repository-detailed.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'organizations/:organizationId/repositories/:repositoryId',
    component: RepositoryDetailedComponent
  },
  {
    path: 'organizations/:organizationId',
    component: OrganizationDetailedComponent
  },
  {
    path: '**',
    component: OrganizationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
