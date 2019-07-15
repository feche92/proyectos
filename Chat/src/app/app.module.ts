import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ChatPage } from "../pages/chat/chat";

//Firebase
import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

import { configs } from './globalConfig';
import { ServiciosAuthProvider } from '../providers/servicios-auth/servicios-auth';
import { ServiciosAlertProvider } from '../providers/servicios-alert/servicios-alert';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { Aula4aProvider } from '../providers/aula4a/aula4a';
import { Aula4BProvider } from '../providers/aula4-b/aula4-b';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configs.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: FirestoreSettingsToken, useValue: {}},
    ServiciosAuthProvider,
    ServiciosAlertProvider,
    SpinnerProvider,
    Aula4aProvider,
    Aula4BProvider
  ]
})
export class AppModule {}
