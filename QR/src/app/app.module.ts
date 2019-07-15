import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';

//Firebase
import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

import { configs } from './globalConfig';
import { ServiciosAuthProvider } from '../providers/servicios-auth/servicios-auth';
import { ServiciosAlertProvider } from '../providers/servicios-alert/servicios-alert';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CreditoProvider } from '../providers/credito/credito';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage
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
    PrincipalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: FirestoreSettingsToken, useValue: {}},
    ServiciosAuthProvider,
    ServiciosAlertProvider,
    SpinnerProvider,
    BarcodeScanner,
    CreditoProvider,
  ]
})
export class AppModule {}
