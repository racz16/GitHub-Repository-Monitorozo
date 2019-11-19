import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetTokenComponent } from './set-token/set-token.component';
import { SettingsComponent } from './settings/settings.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationDetailedComponent } from './organization-detailed/organization-detailed.component';

@NgModule({
  declarations: [
    AppComponent,
    SetTokenComponent,
    SettingsComponent,
    OrganizationListComponent,
    OrganizationDetailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
