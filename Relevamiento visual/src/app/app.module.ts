import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
//import { ChartsModule } from 'ng2-charts';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';
import { CosaslindasPage } from "../pages/cosaslindas/cosaslindas";
import { CosasfeasPage } from "../pages/cosasfeas/cosasfeas";
import { RankingPage } from "../pages/ranking/ranking";

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';

import { configs } from './globalConfig';
import { ServiciosAuthProvider } from '../providers/servicios-auth/servicios-auth';
import { ServiciosAlertProvider } from '../providers/servicios-alert/servicios-alert';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { FotosProvider } from '../providers/fotos/fotos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage,
    CosasfeasPage,
    CosaslindasPage,
    RankingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configs.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    CosasfeasPage,
    CosaslindasPage,
    RankingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: FirestoreSettingsToken, useValue: {}},
    Camera,
    ServiciosAuthProvider,
    ServiciosAlertProvider,
    SpinnerProvider,
    FotosProvider,
    
  ]
})
export class AppModule {}
