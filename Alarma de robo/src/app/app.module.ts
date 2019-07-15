import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeAudio } from '@ionic-native/native-audio';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Vibration } from "@ionic-native/vibration";
import { Flashlight } from "@ionic-native/flashlight";
import { DeviceMotion } from '@ionic-native/device-motion';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';

//Firebase
import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { configs } from './globalConfig';
import { ServiciosAuthProvider } from '../providers/servicios-auth/servicios-auth';
import { ServiciosAlertProvider } from '../providers/servicios-alert/servicios-alert';
import { SpinnerProvider } from '../providers/spinner/spinner';

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
    NativeAudio,
    ScreenOrientation,
    Vibration,
    Flashlight,
    DeviceMotion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiciosAuthProvider,
    ServiciosAlertProvider,
    SpinnerProvider
  ]
})
export class AppModule {}
