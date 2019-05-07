import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressBarModule,
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { InfoComponent } from './info/info.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HistoryComponent } from './history/history.component';
import { SetupComponent } from './setup/setup.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    InfoComponent,
    ToolbarComponent,
    HistoryComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
