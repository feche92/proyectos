import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpinnerProvider } from "../../providers/spinner/spinner";
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { ServiciosAuthProvider } from "../../providers/servicios-auth/servicios-auth";
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CreditoProvider } from "../../providers/credito/credito";


@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  usuarioOnline: string = "Cari";
  creditoActual: number = 0;
  credito10: number = 0;
  credito50: number = 0;
  credito100: number = 0;
  miScan = {};
  codigo: string;
  confirm: any = null;
  idActual:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private error:ServiciosAlertProvider, private auth:ServiciosAuthProvider, private spinner:SpinnerProvider, private MiAuth: AngularFireAuth,
    private barcodeScanner: BarcodeScanner,
    private creditoService: CreditoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
    this.usuarioOnline = this.MiAuth.auth.currentUser.email;
    this.obtenerCreditoDeUsuario();
  }

  private cargarCredito() {
    switch (this.codigo.toString()) {
      case "8c95def646b6127282ed50454b73240300dccabc":
        //credito 10
        if (this.credito10) {
          this.error.mostrarErrorLiteral("QR ya utilizado", "Error")
        } else {
          this.credito10 = 10;
          this.guardarCredito("Se agregó nuevo crédito");
        }
        break;     
      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        //credito 100
        if (this.credito100) {
          this.error.mostrarErrorLiteral("QR ya utilizado", "Error")
        } else {
          this.credito100 = 100;
          this.guardarCredito("Se agregó nuevo crédito");
        }
        break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":
        //credito 50
        if (this.credito50) {
          this.error.mostrarErrorLiteral("QR ya utilizado", "Error")
        } else {
          this.credito50 = 50;
          this.guardarCredito("Se agregó nuevo crédito");
        }
        break;
      default:
        this.error.mostrarErrorLiteral("No es un código válido", "Error");
        break;
    }
  }

  private guardarCredito(mensaje) {
    let spiner = this.spinner.getBigSpinner();
    spiner.present();
    this.creditoService.guardarCredito(this.idActual,this.usuarioOnline,this.credito10,this.credito50,this.credito100)
      .then(response => {
        spiner.dismiss();
        this.error.mostrarErrorLiteral(mensaje, "Excelente!");
        this.obtenerCreditoDeUsuario();
      }, error => {
        spiner.dismiss();
        this.error.mostrarErrorLiteral("Hubo un error al cargar el crédito", "Error!");
        this.obtenerCreditoDeUsuario();
      })
  }

  private obtenerCreditoDeUsuario() {
    let spiner = this.spinner.getBigSpinner();
    spiner.present();
    this.creditoService.obtenerCredito()
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (snapshot.usuario == this.usuarioOnline) {
            this.credito10 = snapshot.credito10;
            this.credito50 = snapshot.credito50;
            this.credito100 = snapshot.credito100;
            this.idActual = snapshot.id;
            console.log(snapshot);
          }
        })
        this.calcularCreditoActual();
        spiner.dismiss();
      })
  }

  private calcularCreditoActual() {
    this.creditoActual = this.credito10 + this.credito50 + this.credito100;
  }

  cerrarSesionClick() {
    let alertConfirm = this.error.mostrarMensajeConfimación("¿Está seguro?", "Cerrar sesión");
    alertConfirm.present();
    alertConfirm.onDidDismiss((confirm) => {
      if (confirm) {
        this.logOut();
      }
    });
}

private logOut() {
  this.auth.logOut();
  this.navCtrl.setRoot(HomePage, { 'fromApp': true });
}

scan() {
  this.barcodeScanner.scan().then((barcodeData) => {
    this.miScan = barcodeData;
    this.codigo = barcodeData.text;
    this.cargarCredito();
  }, (error) => {
    this.error.mostrarErrorLiteral(error);
  });
}

borrarCredito() {
  this.credito10=0;
  this.credito100=0;
  this.credito50=0;
  this.guardarCredito("Se limpio el credito");
}

}
