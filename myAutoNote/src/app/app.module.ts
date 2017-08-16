import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { WorkScreenComponent } from './work-screen/work-screen.component';
import { WorkScreenService } from './work-screen/work-screen.service';
import { UserProfileReducer } from './app-store/reducers/user-profile.reducer';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MaterialModule,MdDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { QuillModule } from 'ngx-quill';
import { DirectoryComponent } from './directory/directory.component';
import { DialogComponent } from './dialog/dialog.component'

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    WorkScreenComponent,
    DirectoryComponent,
    DialogComponent
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MdDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QuillModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreModule.provideStore({ userProfile: UserProfileReducer.reducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [AuthService, WorkScreenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
