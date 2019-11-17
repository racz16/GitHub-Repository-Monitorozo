import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetTokenComponent } from './set-token/set-token.component';
import { SettingsComponent } from './settings/settings.component';
import { SubjectListComponent } from './subject-list/subject-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SetTokenComponent,
    SettingsComponent,
    SubjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
