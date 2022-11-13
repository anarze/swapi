import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';

import {NgxsModule} from '@ngxs/store';
import {NgxsActionsExecutingModule} from '@ngxs-labs/actions-executing';
import {TuiLoaderModule, TuiRootModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiTableModule, TuiTablePaginationModule} from '@taiga-ui/addon-table';
import {TuiLetModule} from '@taiga-ui/cdk';
import {TuiInputModule} from '@taiga-ui/kit';

import {AppComponent} from './app.component';
import {SwapiComponent} from './views/swapi/swapi.component';
import {CharactersState} from './store/characters/characters.state';
import {environment} from '../environments/environment';

const TUI_MODULES = [
  TuiRootModule,
  TuiInputModule,
  TuiTextfieldControllerModule,
  TuiTablePaginationModule,
  TuiTableModule,
  TuiLetModule,
  TuiLoaderModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SwapiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...TUI_MODULES,
    NgxsModule.forRoot([CharactersState], {
      developmentMode: !environment.production
    }),
    NgxsActionsExecutingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
