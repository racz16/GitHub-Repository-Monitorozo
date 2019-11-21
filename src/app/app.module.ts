import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetTokenComponent } from './set-token/set-token.component';
import { SettingsComponent } from './settings/settings.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailedComponent } from './organization-detailed/organization-detailed.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { CreateEditTaskModalComponent } from './create-edit-task-modal/create-edit-task-modal.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { RepositoryDetailedComponent } from './repository-detailed/repository-detailed.component';

@NgModule({
  declarations: [
    AppComponent,
    SetTokenComponent,
    SettingsComponent,
    OrganizationListComponent,
    OrganizationDetailedComponent,
    HelpButtonComponent,
    CreateEditTaskModalComponent,
    ConfirmModalComponent,
    RepositoryDetailedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  entryComponents: [
    CreateEditTaskModalComponent,
    ConfirmModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
