import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { SpinnerProvider } from "../../providers/spinner/spinner";
import { ServiciosAlertProvider } from "../../providers/servicios-alert/servicios-alert";
import { FotosProvider } from "../../providers/fotos/fotos";
import { AngularFireAuth } from '@angular/fire/auth';


@IonicPage()
@Component({
  selector: 'page-cosaslindas',
  templateUrl: 'cosaslindas.html',
})
export class CosaslindasPage {
  lista;
  listaVotos;
  displayed: boolean=false;
  usuario;
  spiner;
  constructor(public navCtrl: NavController, public navParams: NavParams, private error:ServiciosAlertProvider, private spinner:SpinnerProvider,
    private fotos: FotosProvider,
    private alertCtrl : AlertController,
    private miAuth:AngularFireAuth) {
      this.spiner=this.spinner.getAllPageSpinner();
      this.usuario=this.miAuth.auth.currentUser.email;
      this.lista= new Array();
      this.listaVotos=new Array();
      this.spiner.present();
      this.fotos.getLista('cosasLindas').subscribe(lista => {
        this.lista=lista;
        this.lista.sort(function (a,b) {
          if (a.fecha > b.fecha) {
            return -1;
          }
          if (a.fecha < b.fecha) {
            return 1;
          }
          
          return 0;
        })
        this.spiner.dismiss();
        console.log(this.lista);
        this.displayed=true;
      });
      this.fotos.getVotos().subscribe(votos => {
        this.listaVotos=votos;
        console.log(this.listaVotos);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CosaslindasPage');
  }

  back() {
    this.navCtrl.setRoot(PrincipalPage);
  }

  showPicture(data){
    let urlFoto = data.foto;
    let message = "<img style='height: 100%; width: 100%;' src='" + urlFoto + "'></img>";
    let alert = this.alertCtrl.create({
      title: data.usuario,
      buttons: ['Cerrar'],
      message: message,//`<img src="urlFoto"></img>`,
      cssClass: "foto-alert"
    });
    alert.present();
  }

  like(data) {
    data.like++;
    console.log(data);
    //this.spiner.present();
    if(this.comprobarVoto(data)) {
      this.guardarVoto(data);
      console.log('puede votar');
    }
    else {
      this.error.mostrarErrorLiteral("Ya voto esta foto", "Error!");
      data.like--;
    }
  }
  
  private editarFoto(data) {
    let spiner=this.spinner.getAllPageSpinner();
    spiner.present();
    this.fotos.editarFoto("cosasLindas",data)
      .then(response => {
        spiner.dismiss();
      }, error => {
        this.error.mostrarErrorLiteral("Error al votar");
        data.like--;
        spiner.dismiss();
      });
  }

  private comprobarVoto(data) {
    let retorno=true;
    for(let i=0;i<this.listaVotos.length;i++) {
      if(this.listaVotos[i].idFoto == data.id && this.listaVotos[i].usuario == this.usuario) {
        retorno=false;
        break;
      }
    }
    return retorno;
  }

  private guardarVoto(data) {
    this.fotos.guardarVoto(data.id,this.usuario)
    .then(response =>{
      this.editarFoto(data);
    }, error =>{
      this.error.mostrarErrorLiteral("Hubo un error al guardar el voto", "Error!");
      //this.spiner.dismiss();      
    });
  }

}
