import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { ServiciosAuthProvider } from "../../providers/servicios-auth/servicios-auth";
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FotosProvider } from "../../providers/fotos/fotos";
import { CosasfeasPage } from "../cosasfeas/cosasfeas";
import { CosaslindasPage } from "../cosaslindas/cosaslindas";
import { RankingPage } from "../ranking/ranking";



@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  pages = [
    { title: 'Cosas Lindas', component: CosaslindasPage },
    { title: 'Cosas Feas', component: CosasfeasPage },
    { title: 'Ranking', component: RankingPage }
  ];
  image: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private error:ServiciosAlertProvider, private auth:ServiciosAuthProvider,
    private camera: Camera,
    private fotoService: FotosProvider) {
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

  private cerrarSersion(){
    this.auth.logOut();
    this.navCtrl.setRoot(HomePage, { 'fromApp': true });
  }

  cosasLindasClick() {
    this.obtenerFoto("cosasLindas");
  }

  cosasFeasClick() {
    this.obtenerFoto("cosasFeas");
  }

  private obtenerFoto(tipo){
    let options: CameraOptions = {
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.guardaFotosFirebase(this.image, tipo);
    })
  }

  private guardaFotosFirebase(foto:string,tipo:string){
    this.fotoService.guardarFoto(tipo, foto, 0)
    .then(response =>{
      this.error.mostrarMensaje("Se agregó la foto");
      if(tipo=="cosasLindas") {
        this.navCtrl.setRoot(CosaslindasPage, { 'fromApp': true });
      }
      else {
        this.navCtrl.setRoot(CosasfeasPage, { 'fromApp': true });
      }
    }, error =>{
      this.error.mostrarErrorLiteral("Error al agregar la foto", "Error!");      
    });
  }

}
