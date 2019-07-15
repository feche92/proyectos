import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { ServiciosAuthProvider } from "../../providers/servicios-auth/servicios-auth";
import { HomePage } from '../home/home';
import { NativeAudio } from '@ionic-native/native-audio';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { Vibration } from '@ionic-native/vibration';
import { Flashlight } from "@ionic-native/flashlight";
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';



@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  mensaje:string;
  activado:boolean;
  myColor = '';
  x = 0;
  y = 0;
  z = 0;
  horizontal:boolean;
  vertical:boolean;
  derecha:boolean;
  izquierda:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private error:ServiciosAlertProvider, private auth:ServiciosAuthProvider,
    private nativeAudio: NativeAudio,
    private screenOrientation: ScreenOrientation,
    private vibration: Vibration,
    private flashlight: Flashlight,
    private deviceMotion: DeviceMotion,) {
      this.nativeAudio.preloadSimple('hurtando', 'assets/sonidos/hurtando.m4a').catch(error => { });
      this.nativeAudio.preloadSimple('epa', 'assets/sonidos/epa.m4a').catch(error => { });
      this.nativeAudio.preloadSimple('Deja', 'assets/sonidos/Deja.m4a').catch(error => { });
      this.goWaves();
  }

  ionViewDidLoad() {
    this.mensaje="Activar";
    this.activado=false;
    this.horizontal=true;
    this.vertical=true;
    this.derecha=true;
    this.izquierda=true;
    this.myColor='primary'
  }

  private goWaves() {
    this.horizontal=true;
    this.vertical=true;
    this.derecha=true;
    this.izquierda=true;
    var options = { frequency: 1000 };
    let subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration) => {
      if (this.activado) {
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
        console.log("X: ", this.x);
        console.log("y: ", this.y);
        console.log("z: ", this.z);

        if (this.x > 6 && this.x < 9 && this.izquierda) {
          this.flashlight.switchOff();
          this.vibration.vibrate(0);
          this.nativeAudio.play("epa").catch(error => { });
          this.izquierda=false;
          this.derecha=true;
          this.horizontal=true;
          this.vertical=true;

        }

        if (this.x < -6 && this.derecha) {
          this.flashlight.switchOff();
          this.vibration.vibrate(0);
          this.nativeAudio.play("hurtando").catch(error => { });
          this.derecha=false;
          this.izquierda=true;
          this.horizontal=true;
          this.vertical=true;
        }

        if(this.y > 9 && this.vertical) {
          this.vibration.vibrate(0);
          this.nativeAudio.play("Deja").catch(error => { });
  
          setTimeout(() => this.flashlight.switchOn(), 500);
          setTimeout(() => this.flashlight.switchOff(), 5500);
          this.vertical=false;
          this.horizontal=true;
          this.derecha=true;
          this.izquierda=true;
        }

        if(this.x > 9 && this.y < 1 && this.horizontal) {         
          this.flashlight.switchOff();
          this.vibration.vibrate(5000);
          this.nativeAudio.play("epa").catch(error => { });
          this.horizontal=false;
          this.vertical=true;
          this.derecha=true;
          this.izquierda=true;
        }
      }
       
    }, error => {
      this.error.mostrarErrorLiteral(error);
      console.log(error);
    });
  }

  logout() {
    let alertConfirm = this.error.mostrarMensajeConfimación("¿Quieres cerrar sesión?", "Cerrar sesión");
    alertConfirm.present();
    alertConfirm.onDidDismiss((confirm) => {
      if (confirm) {
        this.cerrarSersion();
      }
    });
  }

  alarma() {
    if(this.activado) {
      this.mensaje="Activar";
      this.activado=false;
      this.flashlight.switchOff();
      this.vibration.vibrate(0);
      this.myColor='primary';
      //this.screenOrientation.lock("portrait-primary");
    }
    else {
      this.mensaje="Desactivar";
      this.activado=true;
      this.myColor='danger';
      //this.screenOrientation.unlock();
    }
  }

  private cerrarSersion(){
    this.auth.logOut();
    this.navCtrl.setRoot(HomePage, { 'fromApp': true });
  }

}
