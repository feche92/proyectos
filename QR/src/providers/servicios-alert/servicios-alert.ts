import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ServiciosAlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosAlertProvider {
  static knownErrors: any = [
    {
        code: 'auth/email-already-in-use',
        message: "El correo ya existe"
    },
    {
        code: 'auth/user-not-found',
        message: "El correo no se encuentra registrado"
    },
    {
        code: 'auth/wrong-password',
        message: "Contraseña Incorrecta"
    },
    {
        code: "auth/network-request-failed",
        message: "No hay conexión a internet"
    },
    {
        code: "auth/invalid-email",
        message: "Correo inválido"
    },
    {
        code: "auth/weak-password",
        message: "La contraseña debe tener mínimo 6 caracteres"
    }

  ];
  constructor(public alertCtrl: AlertController) {
    
  }

  public mostrarError(error, title?, message?) {
    console.log("ocurrio un error", error);
    var errorMessage = this.getErrorMessage(error);
    let alert = this.alertCtrl.create({
        title: title ? title : "Error!",
        cssClass: 'error-alert',
        message: message ? message + errorMessage : errorMessage
    });
    alert.present();
}

public mostrarErrorLiteral(error, title?) {
    let alert = this.alertCtrl.create({
        title: title ? title : "Error!",
        message: error,
        cssClass: 'error-alert'
    });
    alert.present();
}

private getErrorMessage(error) {
  var mensaje = "Error desconocido";
  for (var i = 0; i < ServiciosAlertProvider.knownErrors.length; i++) {
      if (error.code == ServiciosAlertProvider.knownErrors[i].code) {
          mensaje = ServiciosAlertProvider.knownErrors[i].message;
          break;
      }
  }
  return mensaje;
}

public mostrarMensajeConfimación(mensaje, title?) {
    let alert = this.alertCtrl.create({
        title: title,
        message: mensaje,
        cssClass: 'confirm-alert',
        buttons: [
            {
                text: 'No',
                role: 'cancel',
                handler: () => {
                    alert.dismiss(false);
                    return false;
                }
            },
            {
                text: 'Si',
                handler: () => {
                    alert.dismiss(true);
                    return false;
                }
            }
        ]
    }
    );
    return alert;
}

}
