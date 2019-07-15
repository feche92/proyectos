import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { ServiciosAuthProvider } from "../../providers/servicios-auth/servicios-auth";
import { LoginPage } from "../login/login";
import { ChatPage } from "../chat/chat";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private error:ServiciosAlertProvider, private auth:ServiciosAuthProvider) {

  }

  logout() {
    let alertConfirm = this.error.mostrarMensajeConfimación("¿Quieres cerrar sesión?", "Cerrar sesión");
    alertConfirm.present();
    alertConfirm.onDidDismiss((confirm) => {
      if (confirm) {
        this.cerrarSesion();
      }
    });
  }

  aula4A(){
    this.navCtrl.setRoot(ChatPage, {nombre: "4A"});
  }

  aula4B(){
    this.navCtrl.setRoot(ChatPage, {nombre: "4B"});    
  }





  private cerrarSesion(){
    this.auth.logOut();
    this.navCtrl.setRoot(LoginPage, { 'fromApp': true });
  }

}
