import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosAuthProvider } from '../../providers/servicios-auth/servicios-auth';
import { ServiciosAlertProvider } from '../../providers/servicios-alert/servicios-alert';
import { SpinnerProvider } from '../../providers/spinner/spinner';
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  splash = true;
  public email:string;
  public pass:string;
  userSelect: string = "";
  selectUserOptions = { title: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private data: ServiciosAuthProvider, private serviceAlert:ServiciosAlertProvider, private spinner: SpinnerProvider) {
    this.selectUserOptions.title = "Usuarios disponibles";
  }

  ionViewDidLoad() {
    /*if (this.navParams.get('fromApp')) {
      this.splash = false;
    } else {
      setTimeout(() => {
        this.splash = false;
      }, 5000);
    }*/
  }

  cancelar() {
    this.email="";
    this.pass="";
  }

  aceptar() {
    if(this.validForm()) {
      let spiner=this.spinner.getAllPageSpinner();
      spiner.present();
      this.data.login(this.email,this.pass).then(res => {
        spiner.dismiss();
        this.navCtrl.setRoot(HomePage, {usuario : res})
      }).catch(error => {
        spiner.dismiss();
        this.serviceAlert.mostrarError(error,"Error al iniciar sesión");
      });
    }
  }

  private validForm(){
    if(this.pass && this.email){
      return true;
    }
    this.serviceAlert.mostrarErrorLiteral("Todos los campos son obligatorios", "Error al registrarse");
    return false;
  }

  userSelectChange() {
    switch (this.userSelect) {
      case "admin": {
        this.email = "admin@gmail.com";
        this.pass = "111111";
        break;
      }
      case "invitado": {
        this.email = "invitado@gmail.com";
        this.pass = "222222";
        break;
      }
      case "usuario": {
        this.email = "usuario@gmail.com";
        this.pass = "333333";
        break;
      }
      case "anonimo": {
        this.email = "anonimo@gmail.com";
        this.pass = "444444";
        break;
      }
      case "tester" : {
        this.email = "tester@gmail.com";
        this.pass = "555555";
        break;
      }
    }
  }

}
