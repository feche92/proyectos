import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { ServiciosAuthProvider } from "../../providers/servicios-auth/servicios-auth";
import { HomePage } from '../home/home';
import { AnimalesPage } from "../animales/animales";
import { ColoresPage } from "../colores/colores";
import { NumerosPage } from "../numeros/numeros";



@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private error:ServiciosAlertProvider, private auth:ServiciosAuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  logout(){
    let alertConfirm = this.error.mostrarMensajeConfimación("¿Quieres cerrar sesión?", "Cerrar sesión");
    alertConfirm.present();
    alertConfirm.onDidDismiss((confirm) => {
      if (confirm) {
        this.cerrarSersion();
      }
    });
  }

  categoryClick(category){
    switch(category){
      case "animales":
      this.navCtrl.setRoot(AnimalesPage);
      break;
      case "numeros":
      this.navCtrl.setRoot(NumerosPage);
      break;
      case "colores":
      this.navCtrl.setRoot(ColoresPage);
      break;
    }

  }

  private cerrarSersion(){
    this.auth.logOut();
    this.navCtrl.setRoot(HomePage, { 'fromApp': true });
  }

}
